package greenfield.group.com.menuservice.security;

import greenfield.group.com.menuservice.security.exceptions.JwtAuthenticationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;

/**
 * Util class that provides methods for generation, validation, etc. of JWT token.
 *
 * @author Ivanov Roman
 * @version 1.0
 */

@Component
public class JwtTokenProvider {

    private static final String TOKEN_PREFIX = "Bearer_";
    private final String secret = "mySecretTempKey";
    private final long validityInMilliseconds = 3600000;
    @Autowired
    private JwtTokenService tokenService;

    /**
     * Метод обновления токена
     *
     * @return обновленный токен
     */
    public String refreshToken(String token) throws JwtAuthenticationException {
        return tokenService.refreshToken(token);
    }

    /**
     * Метод получения токена из запроса
     *
     * @param req запрос
     * @return токен в виде строки
     */
    public String resolveToken(HttpServletRequest req) {
        return tokenService.resolveToken(req);
    }

    /**
     * Установка обновленного токена
     *
     * @param req            запрос
     * @param refreshedToken обновленный токен
     */
    public void setRefreshedToken(HttpServletRequest req, String refreshedToken) {
        tokenService.setRefreshedToken(req, refreshedToken);
    }

    /**
     * Метод валидации токена
     *
     * @param token токен
     * @return true - валидный, false/исключение - не валидный
     * @throws JwtAuthenticationException
     */
    public boolean validateToken(String token) throws JwtAuthenticationException {
        return tokenService.isValidToken(token);
    }

}
