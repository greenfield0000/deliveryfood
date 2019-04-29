package greenfield.group.com.authservice.session;


import greenfield.group.com.authservice.session.utils.RedisUtilComponent;

import java.util.concurrent.TimeUnit;

public interface RedisSessionManager<T> {
    void sessionSave(T session);

    void sessionSave(T session, long millisecond, TimeUnit timeUnit);

    void sessionDelete(T session);

    void setSessionType(RedisUtilComponent<String> sessionType);
}
