package greenfield.group.com.authservice.session;

import org.springframework.data.redis.core.RedisHash;

@RedisHash(value = "session")
public class Session<T> {
    T sessionEntity;
}
