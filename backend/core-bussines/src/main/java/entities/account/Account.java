package entities.account;

import javax.persistence.*;

/**
 * Описание аккаунта
 */
@Entity
@Table(name = "gr_accounts", schema = "account-msql")
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
public class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String login;
    private String password;

    @Column(name = "is_authtorise")
    private boolean isAuthtorise;

    public Account() {
    }

    public Account(String login, String password) {
        this.login = login;
        this.password = password;
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

    public boolean isAuthtorise() {
        return isAuthtorise;
    }

    public void setAuthtorise(boolean authtorise) {
        isAuthtorise = authtorise;
    }

    @Override
    public String toString() {
        return "Account{" +
                "id='" + id + '\'' +
                ", login='" + login + '\'' +
                ", password='" + password + '\'' +
                ", isAuthtorise=" + isAuthtorise +
                '}';
    }
}
