package greenfield.group.com.redisutils.redis.session.sessionimpl;

import api.Account;
import greenfield.group.com.redisutils.redis.session.RedisSessionManager;
import greenfield.group.com.redisutils.redis.session.utils.RedisUtilComponent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;

/**
 * Сервис для работы с сессией-аккаунта
 */
@Service
public class AccountRedisSessionSeriveImpl implements RedisSessionManager<Account> {

    // Время действия сессии
    private TimeUnit sessionTimeUnit = TimeUnit.MINUTES;
    // Единица измерения времени сессии
    private long durationByTimeUnit = 20L;

    @Autowired
    private RedisUtilComponent<String> sessionType;

    @Override
    public void sessionSave(Account accountSession, long durationByTimeUnit, TimeUnit timeUnit) {
//        sessionType.putValueWithTTL(accountSession.getUuid(), accountSession.toString(), durationByTimeUnit, timeUnit);
    }

    @Override
    public void sessionDelete(Account accountSession) {
//        sessionType.putValueWithTTL(accountSession.getUuid(), accountSession.toString(), 1L, TimeUnit.MILLISECONDS);
    }

    @Override
    public void sessionDuration(long durationByTimeUnit) {
        this.durationByTimeUnit = durationByTimeUnit;
    }

    public TimeUnit getSessionTimeUnit() {
        return sessionTimeUnit;
    }

    @Override
    public void setSessionTimeUnit(TimeUnit sessionTimeUnit) {
        this.sessionTimeUnit = sessionTimeUnit;
    }

    public long getDurationByTimeUnit() {
        return durationByTimeUnit;
    }
}
