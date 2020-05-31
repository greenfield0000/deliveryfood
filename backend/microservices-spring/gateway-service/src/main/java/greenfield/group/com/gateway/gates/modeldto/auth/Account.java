package greenfield.group.com.gateway.gates.modeldto.auth;

import java.util.Set;

/**
 * Описание аккаунта
 */
public class Account extends BaseEntity {
    private String login;
    private String password;
    private Boolean isAuthtorised;
    private String nickName;
    private String uuid;
    private User user;
    private Set<Role> roles;

    public Account() {
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

    public Boolean getAuthtorised() {
        return isAuthtorised;
    }

    public void setAuthtorised(Boolean authtorised) {
        isAuthtorised = authtorised;
    }

    public String getNickName() {
        return nickName;
    }

    public void setNickName(String nickName) {
        this.nickName = nickName;
    }

    public String getUuid() {
        return uuid;
    }

    public void setUuid(String uuid) {
        this.uuid = uuid;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }
}
