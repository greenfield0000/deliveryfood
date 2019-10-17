package greenfield.group.com.personal.model;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * Роли для аккаунта
 */
@Data
@Entity
@Table(name = "ACCOUNTROLE")
public class Role extends BaseEntity {
    @Column(name = "name")
    private String name;
    @Column(name = "sysname")
    private String sysname;
}
