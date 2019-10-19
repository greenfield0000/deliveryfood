package greenfield.group.com.authservice.model;

import javax.persistence.*;
import java.util.Set;

/**
 * Описание сущности пользователь
 */
@Entity
@Table(name = "B_USER")
@Inheritance(strategy = InheritanceType.JOINED)
public class User extends BaseEntity {
    private String name;
    private String lastName;
    private String surName;
    private String phone;
    private String email;
    @ManyToMany(cascade = {CascadeType.ALL})
    @JoinTable(
            name = "B_USER_ADDRESS",
            joinColumns = {@JoinColumn(name = "user_id")},
            inverseJoinColumns = {@JoinColumn(name = "address_id")}
    )
    private Set<Address> addresses;

    public User() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getSurName() {
        return surName;
    }

    public void setSurName(String surName) {
        this.surName = surName;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

//    public Set<Address> getAddressList() {
//        return addressList;
//    }
//
//    public void setAddressList(Set<Address> addressList) {
//        this.addressList = addressList;
//    }
}
