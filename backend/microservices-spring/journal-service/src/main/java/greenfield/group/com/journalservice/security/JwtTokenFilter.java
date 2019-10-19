package greenfield.group.com.journalservice.security;

import greenfield.group.com.journalservice.security.exceptions.JwtAuthenticationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

/**
 * JWT token filter that handles all HTTP requests to application.
 *
 * @author Ivanov Roman
 * @version 1.0
 */

@Component
public class JwtTokenFilter extends GenericFilterBean {

    @Autowired
    private final JwtTokenProvider jwtTokenProvider;

    public JwtTokenFilter(JwtTokenProvider jwtTokenProvider) {
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @Override
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain filterChain)
            throws IOException, ServletException {

        String token = jwtTokenProvider.resolveToken((HttpServletRequest) req);
        try {
            if (token != null && jwtTokenProvider.validateToken(token)) {
                jwtTokenProvider.setRefreshedToken((HttpServletRequest) req, jwtTokenProvider.refreshToken(token)
                );
            }
        } catch (JwtAuthenticationException e) {
            logger.error("JwtTokenFilter decrypt error " + e);
        }
        filterChain.doFilter(req, res);
    }

}
