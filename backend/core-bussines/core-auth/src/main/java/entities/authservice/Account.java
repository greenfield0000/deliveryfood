package entities.authservice;

import javax.persistence.*;
import java.util.List;

/**
 * Описание аккаунта
 */
@Entity
@Table(name = "gr_accounts", schema = "entities-msql")
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
public class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "account_id")
    private Long id;

    private String login;
    private String password;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, targetEntity = Role.class)
    @Column(name = "account_role_id")
    private List<Role> roles;

    @Column(name = "is_authtorised")
    private boolean isAuthtorised;

    @Column(name = "nick_name")
    private String nickName;

    public Account() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public List<Role> getRoles() {
        return roles;
    }

    public void setRoles(List<Role> roles) {
        this.roles = roles;
    }

    public boolean isAuthtorised() {
        return isAuthtorised;
    }

    public void setAuthtorised(boolean authtorised) {
        isAuthtorised = authtorised;
    }

    public String getNickName() {
        return nickName;
    }

    public void setNickName(String nickName) {
        this.nickName = nickName;
    }

    @Override
    public String toString() {
        return "Account{" +
                "id=" + id +
                ", login='" + login + '\'' +
                ", password='" + password + '\'' +
                ", roles=" + roles +
                ", isAuthtorised=" + isAuthtorised +
                ", nickName='" + nickName + '\'' +
                '}';
    }
}
