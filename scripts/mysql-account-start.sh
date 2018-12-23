docker run -it --name account-msql-db-service -p 3306:3306 -e MYSQL_ROOT_PASSWORD=123 -e MYSQL_DATABASE=account-msql -d mysql:latest
