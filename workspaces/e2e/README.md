# How to run tests

## Prerequisites:

1. Batect is working, and you have run `./batect setup` successfully in the project root.
2. You have published local images for the changes you're testing for diary-server and diary-client - e2e tests run the app from built images, not source.

## Steps:

1. Duplicate `workspaces/e2e/.env./example` as `workspaces/e2e/.env` and populate with e2e test user credentials for a test user created in Auth0. **DO NOT COMMIT THE .env FILE!**
2. From the project root, run `./e2e.sh`
