FROM redis:7.2.4

COPY redis.conf /usr/local/etc/redis/redis.conf

EXPOSE 6379

CMD ["redis-server", "--bind", "0.0.0.0"]
