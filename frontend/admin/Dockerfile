FROM greenfield0000/b2b-front-environment:v1
MAINTAINER greenfield <greenfield0000@mail.ru>

USER root

RUN mkdir -p angular/interface-admin
WORKDIR /angular/interface-admin
## add source code to workdir
ADD /sources  /angular/interface-admin

EXPOSE 4200

ENTRYPOINT ["npm", "run", "start"]

