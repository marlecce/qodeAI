# qodeAI

A system that, using Redis for data storage, analyzes the source code of a GIT repository, pre-processes the source code, trains machine learning models for optimizations, and provides analysis of the provided source code.

## Redis

```
docker build -t qcodeai-redis-7.2.4 .
docker run -p 6379:6379 --name qcodeai-redis -d qcodeai-redis-7.2.4
```

## Tests

To run the tests you need to set up a ".env" file in the project's root directory, setting the following variables:

```
## REPO
VITE_REPO_LOCAL_PATH= # the directory path in which you want to clone the repo
VITE_REPO_REMOTE_URL= # the repo URL to clone

## REDIS
VITE_REDIS_HOST=
VITE_REDIS_PORT=
```
