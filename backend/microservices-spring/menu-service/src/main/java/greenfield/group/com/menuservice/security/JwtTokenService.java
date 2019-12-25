package greenfield.group.com.menuservice.security;

import greenfield.group.com.menuservice.security.exceptions.JwtAuthenticationException;
import io.jsonwebtoken.*;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.Collections;
import java.util.Date;
import java.util.List;

/**
 * Сервис для работы с токенами
 */
@Service
public class JwtTokenService {

    private static final String TOKEN_PREFIX = "Bearer_";
    private final String secret = "mySecretTempKey";
    private final long validityInMilliseconds = 3600000;

    /**
     * Метод обновления токена
     *
     * @return обновленный токен
     */
    public String refreshToken(String token) throws JwtAuthenticationException {
        if (isValidToken(token)) {
            Claims claims = getClaims(token)
                    .getBody();
            Date now = new Date();
            Date validity = new Date(now.getTime() + validityInMilliseconds);
            return Jwts.builder()//
                    .setClaims(claims)//
                    .setIssuedAt(now)//
                    .setExpiration(validity)//
                    .signWith(SignatureAlgorithm.HS256, secret.getBytes())//
                    .compact();
        }

        return token;
    }

    /**
     * Метод получения токена из запроса
     *
     * @param req запрос
     * @return токен в виде строки
     */
    public String resolveToken(HttpServletRequest req) {
        String bearerToken = req.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith(TOKEN_PREFIX)) {
            return bearerToken.substring(TOKEN_PREFIX.length());
        }
        return null;
    }

    /**
     * Метод получения токена из значения заголовка
     *
     * @param bearerToken токен из заголовка
     * @return токен в виде строки
     */
    public String resolveToken(String bearerToken) {
        if (bearerToken != null && bearerToken.startsWith(TOKEN_PREFIX)) {
            return bearerToken.substring(TOKEN_PREFIX.length());
        }
        return bearerToken;
    }

    /**
     * Установка обновленного токена
     *
     * @param req            запрос
     * @param refreshedToken обновленный токен
     */
    public void setRefreshedToken(HttpServletRequest req, String refreshedToken) {
        req.setAttribute("Authorization", refreshedToken);
    }

    /**
     * Метод валидации токена
     *
     * @param token токен
     * @return true - валидный, false/исключение - не валидный
     * @throws JwtAuthenticationException
     */
    public boolean isValidToken(String token) throws JwtAuthenticationException {
        try {
            Jws<Claims> claims = getClaims(token);
            return !claims.getBody().getExpiration().before(new Date());
        } catch (JwtException | IllegalArgumentException e) {
            throw new JwtAuthenticationException("JWT token is expired or invalid");
        }
    }

    /**
     * Метод полученения заявок из токена
     *
     * @param token токен
     * @return список заявок
     */
    private Jws<Claims> getClaims(String token) {
        return Jwts.parser().setSigningKey(secret.getBytes()).parseClaimsJws(token);
    }

    /**
     * Метод получения списка ролей из токена
     *
     * @param token токен
     * @return список ролей, которые лежат в токене
     * @throws JwtAuthenticationException
     */
    public List<String> getRole(String token) throws JwtAuthenticationException {
        token = resolveToken(token);
        if (isValidToken(token)) {
            Jws<Claims> claims = getClaims(token);
            if (claims != null) {
                Claims claimsBody = claims.getBody();
                if (claimsBody != null) {
                    List<String> roleList = (List<String>) claimsBody.get("roles");
                    if (roleList != null) {
                        return roleList;
                    }
                }
            }
        }
        return Collections.emptyList();
    }
}
