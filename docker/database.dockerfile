FROM postgres:15.3

COPY src/persistence/migrations/* /docker-entrypoint-initdb.d/
