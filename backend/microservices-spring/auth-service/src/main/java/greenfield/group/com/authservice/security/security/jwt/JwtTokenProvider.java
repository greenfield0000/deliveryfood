package greenfield.group.com.authservice.security.security.jwt;

import greenfield.group.com.authservice.model.Role;
import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;

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
    private final UserDetailsService userDetailsService;

    public JwtTokenProvider(UserDetailsService userDetailsService) {
        this.userDetailsService = userDetailsService;
    }

    /**
     * Метод формирования токена
     *
     * @param uuid            уникальный идентификатор учетной записи
     * @param accountRoleList пароль
     * @return
     */
    public String createToken(String uuid, List<Role> accountRoleList) {

        Claims claims = Jwts.claims().setSubject(uuid);
        claims.put("roles", getRoleNames(accountRoleList));

        Date now = new Date();
        Date validity = new Date(now.getTime() + validityInMilliseconds);

        return Jwts.builder()//
                .setClaims(claims)//
                .setIssuedAt(now)//
                .setExpiration(validity)//
                .signWith(SignatureAlgorithm.HS256, secret.getBytes())//
                .compact();
    }

    public Authentication getAuthentication(String token) {
        UserDetails AccountDetails = this.userDetailsService.loadUserByUsername(getLogin(token));
        return new UsernamePasswordAuthenticationToken(AccountDetails, "", AccountDetails.getAuthorities());
    }

    private String getLogin(String token) {
        return Jwts.parser()
                .setSigningKey(secret.getBytes())
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    public String resolveToken(HttpServletRequest req) {
        String bearerToken = req.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith(TOKEN_PREFIX)) {
            return bearerToken.substring(TOKEN_PREFIX.length());
        }
        return null;
    }

    public boolean validateToken(String token) {
        try {
            Jws<Claims> claims = Jwts.parser().setSigningKey(secret.getBytes()).parseClaimsJws(token);
            if (claims.getBody().getExpiration().before(new Date())) {
                return false;
            }
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            throw new JwtAuthenticationException("JWT token is expired or invalid");
        }
    }

    private List<String> getRoleNames(List<Role> accountRoleList) {
        if (accountRoleList == null) {
            return Collections.emptyList();
        }

        List<String> result = new ArrayList<>();
        accountRoleList.forEach(role -> {
            result.add(role.getSysname());
        });
        return result;
    }
}
