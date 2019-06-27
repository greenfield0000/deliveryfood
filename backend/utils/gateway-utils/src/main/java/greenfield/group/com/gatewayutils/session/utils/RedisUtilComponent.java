package greenfield.group.com.gatewayutils.session.utils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;

import java.util.Map;
import java.util.concurrent.TimeUnit;

//@Component
public class RedisUtilComponent<T> {

    @Autowired
    private RedisTemplate<String, T> redisTemplate;

    public void putMap(String redisKey, Object key, T data) {
        redisTemplate.opsForHash().put(redisKey, key, data);
    }

    public T getMapAsSingleEntry(String redisKey, Object key) {
        return (T) redisTemplate.opsForHash().get(redisKey, key);
    }

    public Map<Object, T> getMapAsAll(String redisKey) {
        return (Map<Object, T>) redisTemplate.opsForHash().entries(redisKey);
    }

    public void putValue(String key, T value) {
        redisTemplate.opsForValue().set(key, value);
    }

    public void putValueWithTTL(String key, T value, long millisecond, TimeUnit timeUnit) {
        redisTemplate.opsForValue().set(key, value, millisecond, timeUnit);
    }

    public void putValueWithExpireTime(String key, T value, long timeout, TimeUnit unit) {
        redisTemplate.opsForValue().set(key, value, timeout, unit);
    }

    public T getValue(String key) {
        return redisTemplate.opsForValue().get(key);
    }

    public void setExpire(String key, long timeout, TimeUnit unit) {
        redisTemplate.expire(key, timeout, unit);
    }
}

