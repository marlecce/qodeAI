FROM redis:7.2.4

EXPOSE 6379

CMD ["redis-server", "--bind", "0.0.0.0"]
