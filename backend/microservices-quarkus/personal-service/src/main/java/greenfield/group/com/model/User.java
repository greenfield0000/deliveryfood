package greenfield.group.com.model;

import javax.persistence.Entity;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.Table;
import java.util.UUID;

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
    private UUID uuid;
//
//    @OneToMany(cascade = CascadeType.PERSIST)
//    @JoinTable(
//            name = "USER_ADDRES",
//            joinColumns = @JoinColumn(name = "USER_ID", referencedColumnName = "id"),
//            inverseJoinColumns = @JoinColumn(name = "ADDRESS_ID", referencedColumnName = "id"))
//    private Set<Address> addressList;

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


    public UUID getUuid() {
        return uuid;
    }

    public void setUuid(UUID uuid) {
        this.uuid = uuid;
    }

    @Override
    public String toString() {
        return "User{" +
                "name='" + name + '\'' +
                ", lastName='" + lastName + '\'' +
                ", surName='" + surName + '\'' +
                ", phone='" + phone + '\'' +
                ", email='" + email + '\'' +
                ", uuid='" + uuid + '\'' +
                '}';
    }
}
