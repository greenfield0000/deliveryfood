FROM openjdk:11

#create workdir
RUN mkdir kladr-service
WORKDIR kladr-service
ADD /target /kladr-service

#create user
USER root
#run service
ENTRYPOINT ["java", "-agentlib:jdwp=transport=dt_socket,address=*:9084,suspend=n,server=y" ,"-jar", "fiascloudkladr-service-0.0.1.jar"]
