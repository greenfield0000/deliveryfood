package greenfield.group.com.authservice.configurations;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.databind.util.ISO8601DateFormat;
import com.fasterxml.jackson.datatype.jdk8.Jdk8Module;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;

import java.util.TimeZone;

@Configuration
class RedisConfiguration {

    @Value("${spring.redis.host}") // 127.0.0.1
    private String hostName;

    @Value("${spring.redis.port}") // 6379
    private int port;

    @Bean
    LettuceConnectionFactory redisConnectionFactory() {
        LettuceConnectionFactory redisConnectionFactory = new LettuceConnectionFactory();
        redisConnectionFactory.setHostName(hostName);
        redisConnectionFactory.setPort(port);
        return redisConnectionFactory;
    }

    @Bean
    ObjectMapper redisObjectMapper() {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        objectMapper.registerModule(new Jdk8Module());
        objectMapper.setTimeZone(TimeZone.getTimeZone("GMT+3:00"));
        objectMapper.setDateFormat(new ISO8601DateFormat());
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        objectMapper.configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false);
        return objectMapper;
    }
}