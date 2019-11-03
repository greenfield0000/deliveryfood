package greenfield.group.com.authservice.model;

import lombok.Data;

import javax.persistence.*;
import java.util.Set;

/**
 * Описание аккаунта
 */
@Data
@Entity
@Table(name = "B_ACCOUNT")
public class Account extends BaseEntity {

    @Column(name = "login")
    private String login;
    @Column(name = "password")
    private String password;
    @Column(name = "nick_name")
    private String nickName;
    @OneToOne(cascade = CascadeType.ALL)
    @PrimaryKeyJoinColumn
    private User user;
    @ManyToMany(cascade = {CascadeType.ALL})
    @JoinTable(
            name = "B_ACCOUNT_ROLES",
            joinColumns = {@JoinColumn(name = "account_id")},
            inverseJoinColumns = {@JoinColumn(name = "role_id")}
    )
    private Set<Role> roles;
}
