#!/usr/bin/env bash
# Stop hook: stage everything, commit a checkpoint, and push to the tracked remote.
# Wired up via .claude/settings.local.json. Best-effort — never blocks the session.

# Hook JSON arrives on stdin; use its cwd if present, otherwise stay put.
payload="$(cat)"
dir="$(printf '%s' "$payload" | jq -r '.cwd // empty' 2>/dev/null)"
[ -n "$dir" ] && cd "$dir" 2>/dev/null

# Only act inside a git work tree.
git rev-parse --show-toplevel >/dev/null 2>&1 || exit 0

branch="$(git symbolic-ref --quiet --short HEAD 2>/dev/null)" || exit 0

git add -A

if git diff --cached --quiet; then
  status="no changes"
else
  git commit -q -m "checkpoint: $(date -u +%Y-%m-%dT%H:%M:%SZ)" && status="committed"
fi

if git push -q origin "HEAD:$branch" 2>/tmp/cc-auto-push.err; then
  printf '{"systemMessage": "Auto-push: %s, %s up to date on origin."}\n' "$status" "$branch"
else
  err="$(tr '\n' ' ' < /tmp/cc-auto-push.err | sed 's/"/'"'"'/g')"
  printf '{"systemMessage": "Auto-push: push failed (%s). Local commit is safe."}\n' "${err:-unknown error}"
fi
