FROM node as frontend
WORKDIR /frontend/myapp
COPY frontend/myapp .
RUN npm install
RUN npm run-script build
FROM maven:3.6.3-jdk-11 as BackEnd
WORKDIR /BackEnd
COPY BackEnd .
RUN mkdir -p src/main/resources/static
COPY --from=frontend /frontend/myapp/build src/main/resources/static
RUN mvn clean verify
FROM openjdk:14-jdk-alpine
COPY --from=BackEnd /BackEnd/target/majorproject-0.0.1-SNAPSHOT.jar ./app.jar
EXPOSE 8080
RUN adduser -D user
USER user
CMD [ "sh", "-c", "java -Dserver.port=$PORT -Djava.security.egd=file:/dev/./urandom -jar app.jar" ]