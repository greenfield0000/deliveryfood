package greenfield.group.com.gatewayutils.session.configuration;

import greenfield.group.com.gatewayutils.configuration.redis.SpringRedisPropertiesConfig;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.GenericToStringSerializer;
import org.springframework.session.data.redis.config.annotation.web.http.EnableRedisHttpSession;


@Configuration
@EnableRedisHttpSession
@EnableConfigurationProperties
class RedisConfiguration {

    private final SpringRedisPropertiesConfig redisPropertiesConfig;

    public RedisConfiguration(SpringRedisPropertiesConfig redisPropertiesConfig) {
        this.redisPropertiesConfig = redisPropertiesConfig;
    }

    @Bean
    public LettuceConnectionFactory redisConnectionFactory() {
        LettuceConnectionFactory redisConnectionFactory = new LettuceConnectionFactory();
        redisConnectionFactory.getStandaloneConfiguration().setHostName(redisPropertiesConfig.getHost());
        redisConnectionFactory.getStandaloneConfiguration().setPort(redisPropertiesConfig.getPort());
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