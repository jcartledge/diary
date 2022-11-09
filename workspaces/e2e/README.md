# How to run tests

## Prerequisites:
0. Batect is working - e.g. you can run `./batect setup` successfully in the project root.

## Steps:
1. Duplicate `workspaces/e2e/.env./example` as `workspaces/e2e/.env` and populate with e2e test user credentials for a test user created in Auth0. **DO NOT COMMIT THE .env FILE!**
2. From the project root, run `./e2e.sh`
