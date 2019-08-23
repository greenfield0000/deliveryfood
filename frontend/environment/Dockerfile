FROM ubuntu
MAINTAINER greenfield <greenfield0000@mail.ru>

USER root

## install nodejs and npm package manager
RUN  apt update -y &&  apt upgrade -y \
     &&  apt install nodejs -y &&  apt install npm -y \ 
     && npm install --save-dev webpack

## install angular-cli
RUN npm install -g @angular/cli
