FROM eclipse-temurin:21-jdk-alpine
VOLUME /tmp
COPY target/backend/target/chatbot-0.0.1-SNAPSHOT.jar chatbot.jar
ENTRYPOINT [ "java", "-jar", "/chatbot.jar" ]