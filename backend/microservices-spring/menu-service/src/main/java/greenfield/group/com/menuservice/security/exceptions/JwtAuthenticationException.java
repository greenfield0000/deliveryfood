package greenfield.group.com.menuservice.security.exceptions;

public class JwtAuthenticationException extends Throwable {
    public JwtAuthenticationException(String message) {
        super(message);
    }
}
