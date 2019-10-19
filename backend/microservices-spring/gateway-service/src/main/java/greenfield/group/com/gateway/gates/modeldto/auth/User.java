package greenfield.group.com.gateway.gates.modeldto.auth;

import lombok.Data;

import java.util.Set;

/**
 * Описание сущности пользователь
 */
@Data
public class User extends BaseEntity {
    private String name;
    private String lastName;
    private String surName;
    private String phone;
    private String email;
    private Set<Address> addresses;
}
