package entities.authservice;

import javax.persistence.*;
import java.util.List;

/**
 * Роли для аккаунта
 */
@Entity
@Table(name = "gr_role", schema = "entities-msql")
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;
    private String sysName;

    @ManyToOne(cascade = CascadeType.ALL, targetEntity = Account.class)
    @JoinColumn(name = "account_role_id")
    private List<Account> accounts;

    public Role() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSysName() {
        return sysName;
    }

    public void setSysName(String sysName) {
        this.sysName = sysName;
    }

    public List<Account> getAccounts() {
        return accounts;
    }

    public void setAccounts(List<Account> accounts) {
        this.accounts = accounts;
    }

    @Override
    public String toString() {
        return "Role{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", sysName='" + sysName + '\'' +
                '}';
    }
}
