FROM java:8

#create workdir
RUN mkdir auth-service
WORKDIR auth-service
COPY /target /auth-service

#create user
USER root

#run service
ENTRYPOINT ["java", "-agentlib:jdwp=transport=dt_socket,address=9081,suspend=n,server=y" ,"-jar", "auth-service-0.0.1.jar"]
