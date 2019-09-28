package greenfield.group.com.model;

import lombok.Data;

import javax.persistence.*;
import java.util.Set;

/**
 * Описание сущности пользователь
 */
@Data
@Entity
@Table(name = "User")
@Inheritance(strategy = InheritanceType.JOINED)
public class User extends BaseEntity {
    private String name;
    private String lastName;
    private String surName;
    private String phone;
    private String email;

    @OneToMany(cascade = CascadeType.PERSIST, fetch = FetchType.LAZY)
    @JoinTable(
            name = "USER_ADDRES",
            joinColumns = @JoinColumn(name = "USER_ID", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "ADDRESS_ID", referencedColumnName = "id"))
    private Set<Address> addressList;

}
