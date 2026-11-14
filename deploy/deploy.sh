#!/usr/bin/env bash
set -Eeuo pipefail
umask 077
incoming=$(realpath "${1:?incoming release directory required}")
root="$HOME/plant-deploy"
mkdir -p "$root/releases"
# Serialize all deploys to this server, including retries and manual runs.
exec 9>"$root/deploy.lock"
flock -w 900 9
export DOCKER_CONFIG
DOCKER_CONFIG=$(mktemp -d)
trap 'rm -rf -- "$DOCKER_CONFIG"; rm -f -- "$incoming/registry-token" "$incoming/registry-user"' EXIT
cat "$incoming/registry-token" | docker login ghcr.io --username "$(cat "$incoming/registry-user")" --password-stdin >/dev/null
compose() {
  docker compose --project-name plant --env-file "$1/runtime.env" -f "$1/compose.yml" "${@:2}"
}
compose "$incoming" config --quiet
# Pull before touching healthy running containers.
compose "$incoming" pull
previous=''
if [[ -f "$root/current" ]]; then previous=$(cat "$root/current"); fi
if ! compose "$incoming" up -d --remove-orphans --wait --wait-timeout 360; then
  echo 'Deployment failed. Restoring previous application release.' >&2
  if [[ -n "$previous" ]]; then
    compose "$previous" up -d --remove-orphans --wait --wait-timeout 360 || {
      echo 'Rollback also failed; operator intervention required.' >&2; exit 1;
    }
  else
    compose "$incoming" down
  fi
  exit 1
fi
release="$root/releases/$(date -u +%Y%m%dT%H%M%SZ)-$$"
mkdir "$release"
cp "$incoming/compose.yml" "$incoming/runtime.env" "$release/"
printf '%s\n' "$release" > "$root/current.next"
mv -Tf "$root/current.next" "$root/current"
echo 'Deployment passed container health checks.'
