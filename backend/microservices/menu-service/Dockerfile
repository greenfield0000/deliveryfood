FROM java:8

#create workdir
RUN mkdir menu-service
WORKDIR menu-service
ADD /target /menu-service

#create user
USER root
#run service
ENTRYPOINT ["java", "-jar", "menu-service-0.0.1-SNAPSHOT.jar"]
