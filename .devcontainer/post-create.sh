#!/usr/bin/env bash
set -euo pipefail

# Enable Corepack and make pnpm available for JS/TS workspaces.
corepack enable || true
corepack prepare pnpm@latest --activate || true

python -m pip install --upgrade pip uv

if [ -f pyproject.toml ]; then
  uv sync
else
  echo "No hay pyproject.toml; se omite uv sync."
fi

echo "Devcontainer setup complete."
