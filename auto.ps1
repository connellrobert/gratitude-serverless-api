cp sql\01-initial-migrations.sql ..\old-compliment-api\Compliments-api\sql\init.sql
cd ..\old-compliment-api\Compliments-api\sql
docker stop test
docker rm test
docker build -t test .
docker run -d -p 5432:5432 --name test test
cd ..\..\..\compliment\
# docker exec -it test /bin/bash