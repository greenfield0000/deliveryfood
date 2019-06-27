package greenfield.group.com.gatewayutils.filters;

import org.springframework.stereotype.Component;

import javax.servlet.*;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Arrays;

@Component
public class SessionFilter implements Filter {
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        HttpServletRequest req = (HttpServletRequest) request;
        HttpServletResponse res = (HttpServletResponse) response;
        Cookie[] allCookies = req.getCookies();
        if (allCookies != null) {
            Arrays.stream(allCookies).forEach(System.out::println);
            Cookie session =
                    Arrays.stream(allCookies).filter(x -> x.getName().equals("SESSION"))
                            .findFirst().orElse(null);

            if (session != null) {
                session.setHttpOnly(true);
                session.setSecure(true);
                res.addCookie(session);
            }
        }
        Cookie session = new Cookie("SESSION123","T");
        session.setHttpOnly(true);
        session.setSecure(true);
        res.addCookie(session);


        chain.doFilter(req, res);
    }
}