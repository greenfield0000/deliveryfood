package documents;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;


/**
 * Документ - меню. Данный документ предоставляет основную информацию по
 * панель меню.
 */
@Document(collection = "menu")
public class Menu {

    @Id
    private String id;
    // Описание
    private String name;
    // Системное имя
    private String sysname;
    // Структура меню, описанная в json
    private String jsonMenu;
    // Системные имена ролей пользователей, которым доступно это меню
    private List<String> ownerRole;

    public Menu() {
    }

    public Menu(String id, String name, String sysname, String jsonMenu, List<String> ownerRole) {
        this.id = id;
        this.name = name;
        this.sysname = sysname;
        this.jsonMenu = jsonMenu;
        this.ownerRole = ownerRole;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSysname() {
        return sysname;
    }

    public void setSysname(String sysname) {
        this.sysname = sysname;
    }

    public String getJsonMenu() {
        return jsonMenu;
    }

    public void setJsonMenu(String jsonMenu) {
        this.jsonMenu = jsonMenu;
    }

    public List<String> getOwnerRole() {
        return ownerRole;
    }

    public void setOwnerRole(List<String> ownerRole) {
        this.ownerRole = ownerRole;
    }

    @Override
    public String toString() {
        return "Menu{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", sysname='" + sysname + '\'' +
                ", jsonMenu='" + jsonMenu + '\'' +
                ", ownerRole=" + ownerRole +
                '}';
    }
}
