package greenfield.group.com.authservice.session.configuration;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.GenericToStringSerializer;


@Configuration
class RedisConfiguration {

    @Value("${spring.redis.host}") // 127.0.0.1
    private String hostName;

    @Value("${spring.redis.port}") // 6379
    private int port;

    @Bean
    public LettuceConnectionFactory redisConnectionFactory() {
        LettuceConnectionFactory redisConnectionFactory = new LettuceConnectionFactory();
        redisConnectionFactory.getStandaloneConfiguration().setHostName(hostName);
        redisConnectionFactory.getStandaloneConfiguration().setPort(port);
        return redisConnectionFactory;
    }

    /**
     * RedisTemplate<Long, String> в качестве long будет храниться id
     * аккаунта, string - зашифрованная сессия
     *
     * @return
     */
    @Bean
    public RedisTemplate<Long, String> redisTemplate() {
        final RedisTemplate<Long, String> template = new RedisTemplate<>();
        template.setConnectionFactory(redisConnectionFactory());
        template.setValueSerializer(new GenericToStringSerializer<>(Object.class));
        return template;
    }
}