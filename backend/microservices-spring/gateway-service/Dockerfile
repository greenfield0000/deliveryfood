FROM openjdk:11

#create workdir
RUN mkdir gateway-service
WORKDIR gateway-service
COPY /target /gateway-service

#create user
USER root

#run service
ENTRYPOINT ["java", "-agentlib:jdwp=transport=dt_socket,address=*:9080,suspend=n,server=y" ,"-jar", "gateway-service-0.0.1.jar"]
