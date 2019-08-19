package greenfield.group.com.redisutils.redis.session;


import java.util.concurrent.TimeUnit;

/**
 * Api для работы с сессией
 *
 * @param <T>
 */
public interface RedisSessionManager<T> {
    /**
     * Метод создания сессии
     *
     * @param session            - объект сессии
     * @param durationByTimeUnit - время действия сессии согласно параметру timeUnit
     * @param timeUnit           - единица измерения времени сессии (секунды, минуты, часы ...)
     */
    void sessionSave(T session, long durationByTimeUnit, TimeUnit timeUnit);

    /**
     * Метод удаления сессии
     *
     * @param session - объект сессии
     */
    void sessionDelete(T session);

    /**
     * Установка единиц измерения времени действия сессии
     *
     * @param sessionTimeUnit - единица измерения времени сессии (секунды, минуты, часы ...)
     */
    void setSessionTimeUnit(TimeUnit sessionTimeUnit);

    /**
     * Установить время действия сессии
     *
     * @param durationByTimeUnit - время действия сессии согласно параметру timeUnit
     */
    void sessionDuration(long durationByTimeUnit);

}
