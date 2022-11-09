#!/usr/bin/env sh
env $(cat workspaces/e2e/.env | xargs) ./batect e2e
