FROM openjdk:11

#create workdir
RUN mkdir journal-service
WORKDIR journal-service
ADD /target /journal-service

#create user
USER root
#run service
ENTRYPOINT ["java", "-agentlib:jdwp=transport=dt_socket,address=*:9083,suspend=n,server=y" ,"-jar", "journal-service-0.0.1.jar"]
