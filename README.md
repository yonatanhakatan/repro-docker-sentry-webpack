# Docker / Webpack Sentry Problem

To recreate:
1) Run your Docker Daemon
2) In CLI, run `yarn install`
3) Run `make docker_build SENTRY_AUTH_TOKEN={VALID_TOKEN} SENTRY_ORG={VALID_ORG} SENTRY_PROJECT={VALID_PROJECT}`

Expected Behaviour:    
The project builds successfully 

Actual Behaviour:    
In the Docker output under `Step 10/10 : RUN yarn run build:production`, I am seeing: `ERROR in Sentry CLI Plugin: spawn Unknown system error -8` and the build fails.
