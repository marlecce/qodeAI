# qodeAI

A system that collects data, stores it in Redis, and provides an interface for training and analyzing machine learning models.

## Redis

```
docker build -t qcodeai-redis-7.2.4 .
docker run -p 6379:6379 --name qcodeai-redis -d qcodeai-redis-7.2.4
```
