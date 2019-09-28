package greenfield.group.com.model;

import lombok.Data;

import javax.persistence.*;

/**
 * Описание аккаунта
 */
@Data
@Entity
@Table(name = "Account")
public class Account extends BaseEntity {
    @Column(name = "login")
    private String login;
    @Column(name = "password")
    private String password;
    @Column(name = "is_authtorised")
    private Boolean isAuthtorised;
    @Column(name = "nick_name")
    private String nickName;
    @Column(name = "uuid")
    private String uuid;
    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;
    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "role_id", referencedColumnName = "id")
    private Role accountRole;
}
