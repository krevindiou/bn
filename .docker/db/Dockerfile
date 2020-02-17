FROM postgres:11-alpine
RUN apk update && apk add postgresql-plperl perl-email-address
RUN ln -s /usr/lib/postgresql/plperl.so /usr/local/lib/postgresql
COPY sql/structure.sql /docker-entrypoint-initdb.d
