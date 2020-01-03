package greenfield.group.com.model;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.Entity;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.Table;


/**
 * Описание сущности пользователь
 */
@EqualsAndHashCode(callSuper = true)
@Data
@Entity
@Table(name = "B_USER")
@Inheritance(strategy = InheritanceType.JOINED)
public class User extends BaseEntity {
    private String name;
    private String lastName;
    private String surName;
    private String phone;
    private String email;
}
