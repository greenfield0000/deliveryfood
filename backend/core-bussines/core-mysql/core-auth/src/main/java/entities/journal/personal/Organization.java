package entities.journal.personal;

import entities.authservice.Address;
import lombok.*;

import javax.persistence.*;
import java.util.Set;

/**
 * Бизнес сущность - Организация
 *
 * @author Ivanov Roman
 * @date 03.09.2019
 * @since 8
 **/
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Organization {
    @Id
    private Long id;
    private String name;
    @OneToOne
    @JoinColumn(name="ACCOUNT_ID")
    private Address address;
    private String phone;
    @ManyToMany(mappedBy = "organizations")
    private Set<Employee> employeeSet;
}
