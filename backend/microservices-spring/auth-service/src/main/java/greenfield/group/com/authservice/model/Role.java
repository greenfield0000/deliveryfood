package greenfield.group.com.authservice.model;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import java.util.Set;

/**
 * Роли аккаунта
 */
@Data
@Entity
@Table(name = "B_ACCOUNTROLE")
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
    @ManyToMany(mappedBy = "roles")
    private Set<Account> accounts;
}