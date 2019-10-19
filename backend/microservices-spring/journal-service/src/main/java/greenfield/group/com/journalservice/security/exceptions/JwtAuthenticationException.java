package greenfield.group.com.journalservice.security.exceptions;

public class JwtAuthenticationException extends Throwable {
    public JwtAuthenticationException(String message) {
        super(message);
    }
}
