package greenfield.group.com.gateway.security.exceptions;

public class JwtAuthenticationException extends Throwable {
    public JwtAuthenticationException(String message) {
        super(message);
    }
}
