package greenfield.group.com.authservice.session;

/**
 * Api работы с Redis хранилищем
 */
public interface RedisSession {

    void putSessionByKey(String key, String session);

    String getSessionByKey(String key);

    boolean deleteSessionByKey(String key);

}
