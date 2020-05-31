package greenfield.group.com.authservice.security.dto;

/**
 * DTO class for authentication (login) request.
 *
 * @author Ivanov Roman
 * @version 1.0
 */

public class AuthenticationRequestDto {
    private String login;
    private String password;

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
