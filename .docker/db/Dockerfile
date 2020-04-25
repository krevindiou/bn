FROM postgres:11-alpine
RUN echo $'http://dl-cdn.alpinelinux.org/alpine/v3.10/main\n\
http://dl-cdn.alpinelinux.org/alpine/v3.10/community' > /etc/apk/repositories
RUN apk update && apk add postgresql-plperl perl-email-address
RUN ln -s /usr/lib/postgresql/plperl.so /usr/local/lib/postgresql
COPY api/sql/structure.sql /docker-entrypoint-initdb.d
