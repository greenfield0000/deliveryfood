#!/bin/bash	

function main() {
	echo "BUILD WITH NO QUESTIONS!!!!!"
	mvn clean install -f ./backend/pom.xml &&	docker-compose build --force-rm 
}

# start script here !!!
main

