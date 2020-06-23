package greenfield.group.com.menuservice.repository.model;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Data
@Entity
@Table(name = "m_menudescriptor")
public class MenuDescriptor {
    @Id
    private Long id;
    // Описание
    @Column(name = "name")
    private String name;
    // Системное имя
    @Column(name = "sysname")
    private String sysname;
    // Структура меню, описанная в json
    @Column(name = "json_menu")
    private String jsonMenu;
    // Системные имена ролей пользователей, которым доступно это меню
    // TODO пока что такой колхоз ПОПРАВИТЬ на доп. таблицу
    @Column(name = "rolename")
    private String roleName;
}