#!/usr/bin/env bash
set -Eeuo pipefail
script=$(cd "$(dirname "$0")/.." && pwd)/deploy.sh
work=$(mktemp -d)
trap 'rm -rf -- "$work"' EXIT
export HOME="$work/home" LOG="$work/log" FAIL_ONCE="$work/fail"
mkdir -p "$work/bin" "$HOME/plant-deploy/releases/previous"
cat > "$work/bin/docker" <<'MOCK'
#!/usr/bin/env bash
set -eu
if [[ "$1" == login ]]; then cat >/dev/null; exit 0; fi
printf '%s\n' "$*" >> "$LOG"
if [[ "$*" == *' up '* && -f "$FAIL_ONCE" ]]; then rm "$FAIL_ONCE"; exit 1; fi
MOCK
# Git Bash lacks flock on some installations; serialization is verified by inspection.
cat > "$work/bin/flock" <<'MOCK'
#!/usr/bin/env bash
exit 0
MOCK
chmod +x "$work/bin/"*
export PATH="$work/bin:$PATH"
prepare() {
 mkdir -p "$work/incoming"
 printf 'test\n' > "$work/incoming/runtime.env"
 printf 'test\n' > "$work/incoming/compose.yml"
 printf 'token\n' > "$work/incoming/registry-token"
 printf 'user\n' > "$work/incoming/registry-user"
}
prepare
bash "$script" "$work/incoming"
[[ -f "$HOME/plant-deploy/current" ]]
[[ ! -f "$work/incoming/registry-token" ]]
previous=$(cat "$HOME/plant-deploy/current")
prepare
touch "$FAIL_ONCE"
if bash "$script" "$work/incoming"; then echo 'Expected deployment failure' >&2; exit 1; fi
[[ "$(cat "$HOME/plant-deploy/current")" == "$previous" ]]
grep -q -- "$previous/runtime.env.*up -d" "$LOG"
[[ ! -f "$work/incoming/registry-token" ]]
rm "$HOME/plant-deploy/current"
prepare
touch "$FAIL_ONCE"
if bash "$script" "$work/incoming"; then exit 1; fi
grep -q ' down$' "$LOG"
echo 'PASS: success, rollback, initial failure cleanup, credential cleanup'
