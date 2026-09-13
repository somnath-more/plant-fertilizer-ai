FROM maven:3.9-eclipse-temurin-17 AS build

ARG SERVICE
WORKDIR /workspace
COPY ${SERVICE}/pom.xml ./pom.xml
COPY ${SERVICE}/src ./src
RUN mvn -B -ntp -Dmaven.test.skip=true package

FROM eclipse-temurin:17-jre
WORKDIR /app
RUN groupadd --system app && useradd --system --gid app app
COPY --from=build /workspace/target/*.jar /app/app.jar
USER app
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
