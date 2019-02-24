FROM ubuntu
MAINTAINER greenfield <greenfield0000@mail.ru>

USER root

## install nodejs and npm package manager
RUN  apt update -y &&  apt upgrade -y \
&&  apt install nodejs -y &&  apt install npm -y

## install angular-cli
RUN npm install -g @angular/cli

## create workdir
RUN mkdir angular && cd angular && mkdir suppbery-admin
WORKDIR /angular/suppbery-admin

## add source code to workdir
ADD ./sources  /angular/suppbery-admin

## set runner.sh script ass executed
RUN  chmod +x runner.sh

ENTRYPOINT [ "sh", "runner.sh" ]

