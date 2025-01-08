FROM postgres

ADD ./src/database/1_create_tables.sql /docker-entrypoint-initdb.d
ADD ./src/database/2_seeding_tables.sql /docker-entrypoint-initdb.d

RUN chmod a+r /docker-entrypoint-initdb.d/*