package greenfield.group.com.gateway.gates.modeldto.auth;

import lombok.Data;

import java.util.Set;

/**
 * Роли аккаунта
 */
@Data
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

    private  String sysname;
    private  String name;
    private Set<Account> accounts;
}