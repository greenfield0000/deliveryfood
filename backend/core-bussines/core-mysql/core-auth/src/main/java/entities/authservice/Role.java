package entities.authservice;

import javax.persistence.*;

/**
 * Роли для аккаунта
 */
@Entity
@Table(name = "Role")
public class Role {

    private Long id;
    private String name;
    private String sysname;

    public Role() {
    }

    public Role(Long id, String name, String sysname) {
        this.id = id;
        this.name = name;
        this.sysname = sysname;
    }

    @Id
    @GeneratedValue
    @Column(name = "id")
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Column(name = "name")
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Column(name = "sysname")
    public String getSysname() {
        return sysname;
    }

    public void setSysname(String sysname) {
        this.sysname = sysname;
    }

    @Override
    public String toString() {
        return "Role{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", sysname='" + sysname + '\'' +
                '}';
    }
}
