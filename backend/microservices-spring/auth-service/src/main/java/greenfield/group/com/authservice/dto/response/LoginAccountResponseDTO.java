package greenfield.group.com.authservice.dto.response;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import greenfield.group.com.authservice.model.Account;

@JsonIgnoreProperties(ignoreUnknown = true)
public class LoginAccountResponseDTO {
    private String uuid;
    private String login;
    private String password;
    private String token;

    public LoginAccountResponseDTO(String uuid, String login, String password) {
        this.uuid = uuid;
        this.login = login;
        this.password = password;
    }

    public static LoginAccountResponseDTO accountToDTO(Account account) {
        return new LoginAccountResponseDTO(
                account.getUuid(),
                account.getLogin(),
                account.getPassword()
        );
    }

    public String getUuid() {
        return uuid;
    }

    public void setUuid(String uuid) {
        this.uuid = uuid;
    }

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

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
