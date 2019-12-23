package greenfield.group.com.menuservice;

import lombok.Data;

import java.util.List;

@Data
public class Menu {
    private String id;
    // Описание
    private String name;
    // Системное имя
    private String sysname;
    // Url страницы, на которую необходим переход, при
    // клике на пункт меню
    private String pathOfDash;
    // Структура меню, описанная в json
    private String jsonMenu;
    // Системные имена ролей пользователей, которым доступно это меню
    private List<String> ownerRole;
}