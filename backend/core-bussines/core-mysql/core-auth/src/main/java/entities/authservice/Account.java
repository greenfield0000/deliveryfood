package entities.authservice;

import javax.persistence.*;

/**
 * Описание аккаунта
 */
@Entity
@Table(name = "Account")
public class Account {

    private Long id;
    private String login;
    private String password;
    private Boolean isAuthtorised;
    private String nickName;
    private String uuid;
    private Role accountRole = new Role();

    public Account() {
    }

    public Account(Long id, String login, String password, boolean isAuthtorised, String nickName, String uuid, Role accountRole) {
        this.id = id;
        this.login = login;
        this.password = password;
        this.isAuthtorised = isAuthtorised;
        this.nickName = nickName;
        this.uuid = uuid;
        this.accountRole = accountRole;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Column(name = "login")
    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    @Column(name = "password")
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Column(name = "is_authtorised")
    public boolean isAuthtorised() {
        return isAuthtorised;
    }

    public void setAuthtorised(boolean authtorised) {
        isAuthtorised = authtorised;
    }

    @Column(name = "nick_name")
    public String getNickName() {
        return nickName;
    }

    public void setNickName(String nickName) {
        this.nickName = nickName;
    }

    @Column(name = "uuid")
    public String getUuid() {
        return uuid;
    }

    public void setUuid(String uuid) {
        this.uuid = uuid;
    }

    @ManyToOne
    @JoinColumn(name = "role_id", referencedColumnName = "id")
    public Role getAccountRole() {
        return accountRole;
    }

    public void setAccountRole(Role accountRole) {
        this.accountRole = accountRole;
    }

    @Override
    public String toString() {
        return "Account{" +
                "id=" + id +
                ", login='" + login + '\'' +
                ", password='" + password + '\'' +
                ", isAuthtorised=" + isAuthtorised +
                ", nickName='" + nickName + '\'' +
                ", uuid='" + uuid + '\'' +
                ", accountRole=" + accountRole +
                '}';
    }
}
