package greenfield.group.com.gateway.gates.modeldto.auth;

import lombok.Data;

import java.util.Set;

/**
 * Описание аккаунта
 */
@Data
public class Account extends BaseEntity {
    private String login;
    private String password;
    private Boolean isAuthtorised;
    private String nickName;
    private String uuid;
    private User user;
    private Set<Role> roles;
}
