#!/bin/bash

echo "VERCEL_ENV: $VERCEL_ENV"

if [[ $VERCEL_ENV == "production" ]] ; then
  echo "Checking for 'build' in the latest commit..."
  git log -1 --pretty=oneline --abbrev-commit | grep -w "build" && exit 1 || exit 0
else
  exit 1
fi
