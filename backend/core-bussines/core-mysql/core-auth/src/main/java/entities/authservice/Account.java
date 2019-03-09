package entities.authservice;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

/**
 * Описание аккаунта
 */
@Entity
@Table(name = "Account")
@JsonIgnoreProperties(ignoreUnknown = true)
public class Account {

    private Long id;
    private String login;
    private String password;
    private Boolean isAuthtorised;
    private String nickName;
    private String uuid;
    private User user;
    private Role accountRole;

    public Account() {
    }

    public Account(Long id, String login, String password, Boolean isAuthtorised, String nickName, String uuid, User user, Role accountRole) {
        this.id = id;
        this.login = login;
        this.password = password;
        this.isAuthtorised = isAuthtorised;
        this.nickName = nickName;
        this.uuid = uuid;
        this.user = user;
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

    @Transient
    @Column(name = "is_authtorised")
    public boolean isAuthtorised() {
        return isAuthtorised;
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

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "role_id", referencedColumnName = "id")
    public Role getAccountRole() {
        return accountRole;
    }

    public void setAccountRole(Role accountRole) {
        this.accountRole = accountRole;
    }

    public Boolean getAuthtorised() {
        return isAuthtorised;
    }

    public void setAuthtorised(boolean authtorised) {
        isAuthtorised = authtorised;
    }

    public void setAuthtorised(Boolean authtorised) {
        isAuthtorised = authtorised;
    }

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
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
                ", user=" + user +
                ", accountRole=" + accountRole +
                '}';
    }
}
