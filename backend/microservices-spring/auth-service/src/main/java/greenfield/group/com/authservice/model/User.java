package greenfield.group.com.authservice.model;

import lombok.Data;

import javax.persistence.*;
import java.util.Set;

/**
 * Описание сущности пользователь
 */
@Data
@Entity
@Table(name = "b_user")
@Inheritance(strategy = InheritanceType.JOINED)
public class User extends BaseEntity {
    private String name;
    private String lastName;
    private String surName;
    private String phone;
    private String email;
    @ManyToMany(cascade = {CascadeType.ALL})
    @JoinTable(
            name = "b_user_address",
            joinColumns = {@JoinColumn(name = "user_id")},
            inverseJoinColumns = {@JoinColumn(name = "address_id")}
    )
    private Set<Address> addresses;
}
