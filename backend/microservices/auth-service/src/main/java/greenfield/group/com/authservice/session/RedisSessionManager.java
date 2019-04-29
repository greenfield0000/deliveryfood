package greenfield.group.com.authservice.session;


public interface RedisSessionManager<T> {

    void sessionSave(T session);
}
