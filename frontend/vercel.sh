#!/bin/bash

echo "VERCEL_ENV: $VERCEL_ENV"

if [[ "$VERCEL_ENV" == "production" ]] ; then
  echo "Checking for 'build' in the latest commit..."
  git log -1 --pretty=oneline --abbrev-commit | grep -w "build" && exit 1 || exit 0
  echo "✅ - Build can proceed"
  exit 1;
else
  echo "🛑 - Build cancelled"
  exit 0;
fi
