FROM openjdk:11

#create workdir
RUN mkdir menu-service
WORKDIR menu-service
ADD /target /menu-service

#create user
USER root
#run service
ENTRYPOINT ["java", "-agentlib:jdwp=transport=dt_socket,address=*:9082,suspend=n,server=y" ,"-jar", "menu-service-0.0.1.jar"]
