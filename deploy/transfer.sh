#!/usr/bin/env bash
set -Eeuo pipefail
umask 077
: "${DEPLOY_HOST:?}" "${DEPLOY_USER:?}" "${SSH_PRIVATE_KEY:?}" "${SSH_KNOWN_HOSTS:?}" "${RUNTIME_ENV:?}"
[[ "$DEPLOY_HOST" =~ ^[a-zA-Z0-9.-]+$ && "$DEPLOY_USER" =~ ^[a-zA-Z0-9_-]+$ ]] || exit 1
[[ "$GITHUB_SHA" =~ ^[a-f0-9]{40}$ ]] || exit 1
work=$(mktemp -d)
trap 'rm -rf -- "$work"' EXIT
printf '%s\n' "$SSH_PRIVATE_KEY" > "$work/key"
printf '%s\n' "$SSH_KNOWN_HOSTS" > "$work/known_hosts"
mkdir "$work/bundle"
cp deploy/compose.yml deploy/deploy.sh "$work/bundle/"
printf '%s\n' "$RUNTIME_ENV" > "$work/bundle/runtime.env"
printf '\nIMAGE_PREFIX=ghcr.io/%s\nIMAGE_TAG=%s\n' "${GITHUB_REPOSITORY,,}" "$GITHUB_SHA" >> "$work/bundle/runtime.env"
printf '%s' "$REGISTRY_TOKEN" > "$work/bundle/registry-token"
printf '%s' "$REGISTRY_USER" > "$work/bundle/registry-user"
ssh_opts=(-i "$work/key" -o BatchMode=yes -o StrictHostKeyChecking=yes -o "UserKnownHostsFile=$work/known_hosts")
# Secret data goes through encrypted stdin, never through a remote command argument.
tar -C "$work/bundle" -czf - . | ssh "${ssh_opts[@]}" "$DEPLOY_USER@$DEPLOY_HOST" \
  'set -eu; umask 077; mkdir -p "$HOME/plant-deploy"; cd "$HOME/plant-deploy"; incoming=$(mktemp -d incoming.XXXXXX); trap '\''rm -rf -- "$incoming"'\'' EXIT; tar -xzf - -C "$incoming"; bash "$incoming/deploy.sh" "$incoming"'
