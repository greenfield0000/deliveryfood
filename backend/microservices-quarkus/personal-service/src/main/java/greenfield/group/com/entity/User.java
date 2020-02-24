package greenfield.group.com.entity;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.util.Date;
import java.util.UUID;


/**
 * Описание сущности пользователь
 */
@Entity
@Table(name = "B_USER")
//@Inheritance(strategy = InheritanceType.JOINED)
public class User extends PanacheEntityBase {

    @Id
    @SequenceGenerator(name = "hibernateSeq", sequenceName = "HIBERNATE_SEQUENCE", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "hibernateSeq")
    public Long id;

    @Column(name = "created", updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    @CreationTimestamp
    public Date created;

    @Column(name = "updated")
    @Temporal(TemporalType.TIMESTAMP)
    @UpdateTimestamp
    public Date updated;
//
//    @Enumerated(EnumType.STRING)
//    @Column(name = "status")
//    public Status status;

    @Column(name = "uuid", updatable = false)
    public String uuid = UUID.randomUUID().toString();

    public String name;
    public String lastName;
    public String surName;
    public String phone;
    public String email;

    /**
     * Функция копирования для обновления данных пользователя
     *
     * @param user пользователь с новыми данными
     */
    public void copy4Update(User user) {
        this.updated = new Date();
        this.name = (user.name != null) ? user.name : this.name;
        this.lastName = (user.lastName != null) ? user.lastName : this.lastName;
        this.surName = (user.surName != null) ? user.surName : this.surName;
        this.phone = (user.phone != null) ? user.phone : this.phone;
        this.email = (user.email != null) ? user.email : this.email;
    }

}
