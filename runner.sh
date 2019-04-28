#!/bin/bash	


function main() {
	

	echo "Build java modules ?"
	select yn in "Yes" "No"; do
	    case $yn in
	        Yes ) mvn clean install -f ./backend/pom.xml; break;;
	        No ) break;;
	    esac
	done	


	echo "Build and start docker-compose ?"
	select yn in "Yes" "No"; do
    case $yn in
			Yes ) docker-compose up --force-rm -d;  break;;
			No ) break;;
    esac
	done
}

# start script here !!!
main
