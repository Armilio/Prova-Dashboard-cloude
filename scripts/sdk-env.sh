#!/usr/bin/env bash
# Prepara l'ambiente per eseguire now-sdk in modalità non interattiva (CI mode).
# Legge SN_INSTANCE_URL / SN_USERNAME / SN_PASSWORD dalle variabili d'ambiente
# o, se assenti, dal file .env nella root del repo (non committato).
# Uso (dalla root del repo): source scripts/sdk-env.sh && cd apps/<app> && npm run deploy
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
if [ -z "$SN_INSTANCE_URL" ] && [ -f "$ROOT/.env" ]; then
    set -a; . "$ROOT/.env"; set +a
fi
export SN_SDK_NODE_ENV=SN_SDK_CI_INSTALL
export SN_SDK_AUTH_TYPE=basic
export SN_SDK_INSTANCE_URL="$SN_INSTANCE_URL"
export SN_SDK_USER="$SN_USERNAME"
export SN_SDK_USER_PWD="$SN_PASSWORD"
# Il fetch nativo di Node non legge HTTPS_PROXY senza questo flag
export NODE_USE_ENV_PROXY=1
