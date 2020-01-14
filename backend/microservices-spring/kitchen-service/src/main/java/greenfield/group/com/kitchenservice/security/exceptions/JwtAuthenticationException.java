package greenfield.group.com.kitchenservice.security.exceptions;

public class JwtAuthenticationException extends Throwable {
    public JwtAuthenticationException(String message) {
        super(message);
    }
}
