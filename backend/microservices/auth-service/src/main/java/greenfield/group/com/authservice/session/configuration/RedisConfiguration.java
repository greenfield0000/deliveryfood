package greenfield.group.com.authservice.configurations;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisStandaloneConfiguration;
import org.springframework.data.redis.connection.jedis.JedisClientConfiguration;
import org.springframework.data.redis.connection.jedis.JedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.GenericToStringSerializer;

@Configuration
class RedisConfiguration {

    @Value("${spring.redis.host}") // 127.0.0.1
    private String hostName;

    @Value("${spring.redis.port}") // 6379
    private int port;

//    @Bean
//    public LettuceConnectionFactory redisConnectionFactory() {
//        LettuceConnectionFactory redisConnectionFactory = new LettuceConnectionFactory();
//        redisConnectionFactory.getStandaloneConfiguration().setHostName(hostName);
//        redisConnectionFactory.getStandaloneConfiguration().setPort(port);
//        return redisConnectionFactory;
//    }
//
//    @Bean
//    public ObjectMapper redisObjectMapper() {
//        ObjectMapper objectMapper = new ObjectMapper();
//        objectMapper.registerModule(new JavaTimeModule());
//        objectMapper.registerModule(new Jdk8Module());
//        objectMapper.setTimeZone(TimeZone.getTimeZone("GMT+3:00"));
//        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
//        objectMapper.configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false);
//        return objectMapper;
//    }

    @Bean
    protected JedisConnectionFactory jedisConnectionFactory() {
        RedisStandaloneConfiguration configuration = new RedisStandaloneConfiguration(hostName, port);
        JedisClientConfiguration jedisClientConfiguration = JedisClientConfiguration.builder().usePooling().build();
        JedisConnectionFactory factory = new JedisConnectionFactory(configuration, jedisClientConfiguration);
        factory.afterPropertiesSet();
        return factory;
    }

    /**
     * RedisTemplate<Long, String> в качестве long будет храниться id
     * аккаунта, string - зашифрованная сессия
     *
     * @return
     */
    @Bean(name = "redisTemplate")
    public RedisTemplate<Long, String> redisTemplate() {
        final RedisTemplate<Long, String> template = new RedisTemplate<>();
        template.setConnectionFactory(jedisConnectionFactory());
        template.setValueSerializer(new GenericToStringSerializer<>(Object.class));
        return template;
    }
}