package greenfield.group.com.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * Роли для аккаунта
 */
@Entity
@Table(name = "B_ACCOUNTROLE")
public class Role extends BaseEntity {
    @Column(name = "name")
    private String name;
    @Column(name = "sysname")
    private String sysname;

    public Role() {
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
}
