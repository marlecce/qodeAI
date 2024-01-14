# qodeAI

A system that, using Redis for data storage, analyzes the source code of a GIT repository, pre-processes the source code, trains machine learning models for optimizations, and provides analysis of the provided source code.

## Redis

```
docker build -t qcodeai-redis-7.2.4 .
docker run -p 6379:6379 --name qcodeai-redis -d qcodeai-redis-7.2.4
```
