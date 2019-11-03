package greenfield.group.com.authservice.dto.response;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import greenfield.group.com.authservice.model.Account;
import lombok.Data;

import java.util.UUID;

@Data
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
}
