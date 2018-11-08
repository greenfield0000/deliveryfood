FROM ubuntu:latest
LABEL maintainer="Ivanov Roman <greenfield0000@mail.ru>"

#create work-directory
RUN mkdir data
ADD . ./data

#some update and install 
RUN apt update -y 
#&& apt upgrade -y
    
RUN apt install npm -y \
    && npm i && npm install -g @angular/cli -y

RUN chmod +x ./data/serve.sh

ENTRYPOINT [ "sh", "/data/serve.sh" ]