package api;

import lombok.*;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

/**
 * Сотрудник
 *
 * @author Ivanov Roman
 * @date 03.09.2019
 * @since 8
 **/
@Entity
@Data
@PrimaryKeyJoinColumn(name = "EMPLOYEE_ID")
public class Employee extends User {
    @ManyToMany(cascade = { CascadeType.ALL })
    @JoinTable(
            name = "ORGANIZATION_EMPLOYEE",
            joinColumns = { @JoinColumn(name = "EMPLOYEE_ID") },
            inverseJoinColumns = { @JoinColumn(name = "ORGANIZATION_ID") }
    )
    private Set<Organization> organizations = new HashSet<>();
    private String tabNum;
    @Enumerated
    private AccountRole role;
}
