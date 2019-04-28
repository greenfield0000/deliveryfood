#!/bin/bash	

# build java backend modules
mvn clean install

# build docker images from ./ (current context)
docker-compose build
