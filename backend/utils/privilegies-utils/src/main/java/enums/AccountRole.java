package enums;

/**
 * Роли аккаунта
 */
public enum AccountRole {

    // Супер пользователь
    ROOT(1L, "ROOT", "Супер пользователь"),
    // Администратор
    ADMINISTRATOR(2L, "ADMINISTRATOR", "Администратор"),
    // Бармен
    BARMEN(3L, "BARMEN", "Бармен"),
    // Главный официант
    MAINWAITER(4L, "MAINWAITER", "Главный официант"),
    // Официант
    WAITER(5L, "WAITER", "Официант");

    private final String sysname;
    private final String name;
    private final long id;

    AccountRole(long id, String sysname, String name) {
        this.id = id;
        this.sysname = sysname;
        this.name = name;
    }

    public long getId() {
        return id;
    }

    public String getSysname() {
        return sysname;
    }

    public String getName() {
        return name;
    }


}