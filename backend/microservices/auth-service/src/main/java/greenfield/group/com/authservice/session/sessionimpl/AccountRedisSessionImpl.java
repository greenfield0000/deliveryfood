package greenfield.group.com.authservice.session.sessionimpl;

import entities.authservice.Account;
import greenfield.group.com.authservice.session.RedisSessionManager;
import greenfield.group.com.authservice.session.utils.RedisUtilComponent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.concurrent.TimeUnit;

/**
 * Сессия-аккаунта
 */
@Component
public class AccountRedisSessionImpl implements RedisSessionManager<Account> {

    @Autowired
    private RedisUtilComponent<String> sessionType;

    @Override
    public void sessionSave(Account account) {
        sessionType.putValue(account.getUuid(), account.toString());
    }

    @Override
    public void sessionSave(Account session, long millisecond, TimeUnit timeUnit) {
        sessionType.putValueWithTTL(session.getUuid(), session.toString(), millisecond, timeUnit);
    }

    @Override
    public void sessionDelete(Account session) {
        sessionType.putValueWithTTL(session.getUuid(), session.toString(), 1L, TimeUnit.MILLISECONDS);
    }

    @Override
    public void setSessionType(RedisUtilComponent<String> sessionType) {
        this.sessionType = sessionType;
    }
}
