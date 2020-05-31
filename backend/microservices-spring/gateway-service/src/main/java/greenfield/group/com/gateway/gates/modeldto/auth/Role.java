package greenfield.group.com.gateway.gates.modeldto.auth;

import java.util.Set;

/**
 * Роли аккаунта
 */
public class Role extends BaseEntity {
//
//    // Супер пользователь
//    ROOT(1L, "ROOT", "Супер пользователь"),
//    // Администратор
//    ADMINISTRATOR(2L, "ADMINISTRATOR", "Администратор"),
//    // Бармен (менеджер)
//    BARMEN_MANAGER(3L, "BARMEN_MANAGER", "Бармен (менеджер)"),
//    // Главный официант
//    MAINWAITER(4L, "MAINWAITER", "Главный официант"),
//    // Официант
//    WAITER(5L, "WAITER", "Официант"),
//    // Бармен
//    BARMEN(6L, "BARMEN", "Бармен");

    private String sysname;
    private String name;
    private Set<Account> accounts;

    public Role() {
    }

    public String getSysname() {
        return sysname;
    }

    public void setSysname(String sysname) {
        this.sysname = sysname;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<Account> getAccounts() {
        return accounts;
    }

    public void setAccounts(Set<Account> accounts) {
        this.accounts = accounts;
    }
}