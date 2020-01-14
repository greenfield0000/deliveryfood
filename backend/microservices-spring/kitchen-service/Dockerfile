FROM java:8

#create workdir
RUN mkdir kitchen-service
WORKDIR kitchen-service
ADD /target /kitchen-service

#create user
USER root
#run service
ENTRYPOINT ["java", "-agentlib:jdwp=transport=dt_socket,address=9085,suspend=n,server=y" ,"-jar", "kitchen-service-0.0.1.jar"]
