package greenfield.group.com.authservice.dto.response;

import greenfield.group.com.personal.model.Account;
import greenfield.group.com.personal.model.Role;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class LoginAccountResponseDTO {
    private final String uuid;
    private final String login;
    private final String password;
    private final boolean isAuthtorised;
    private final Role accountRole;
    private String token;

    public static LoginAccountResponseDTO accountToDTO(Account account) {
        return new LoginAccountResponseDTO(
                account.getUuid(),
                account.getLogin(),
                account.getPassword(),
                account.getIsAuthtorised(),
                account.getRole()
        );
    }
}
