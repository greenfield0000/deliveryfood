package greenfield.group.com.journalservice.security;

import greenfield.group.com.journalservice.security.exceptions.JwtAuthenticationException;
import io.jsonwebtoken.*;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;

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

    /**
     * Метод обновления токена
     *
     * @return обновленный токен
     */
    public String refreshToken(String token) throws JwtAuthenticationException {
        if (validateToken(token)) {
            Claims claims = Jwts.parser()
                    .setSigningKey(secret.getBytes()).parseClaimsJws(token)
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
    public boolean validateToken(String token) throws JwtAuthenticationException {
        try {
            Jws<Claims> claims = Jwts.parser().setSigningKey(secret.getBytes()).parseClaimsJws(token);
            return !claims.getBody().getExpiration().before(new Date());
        } catch (JwtException | IllegalArgumentException e) {
            throw new JwtAuthenticationException("JWT token is expired or invalid");
        }
    }

}
