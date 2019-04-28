package greenfield.group.com.authservice.services;

import greenfield.group.com.authservice.services.interfaces.RedisSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

/**
 * Класс для работы с сессией на основе редиса
 */
@Repository
public class RedisSessionService implements RedisSession {

    private static final String ACCOUNT_SESSION_HASH = "account_session";

    @Autowired
    private RedisTemplate redisTemplate;

    public RedisTemplate getRedisTemplate() {
        return redisTemplate;
    }

    @Override
    public void putSessionByKey(String key, String session) {
        redisTemplate.opsForHash()
                .put(key, ACCOUNT_SESSION_HASH, session);
    }

    @Override
    public String getSessionByKey(String key) {
        return String.valueOf(
                redisTemplate.opsForHash().get(key, ACCOUNT_SESSION_HASH)
        );
    }

    @Override
    public boolean deleteSessionByKey(String key) {
        final Long delete = redisTemplate.opsForHash()
                .delete(key, ACCOUNT_SESSION_HASH);
        return Long.valueOf(1).equals(delete);
    }

}
