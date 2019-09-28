package greenfield.group.com.model;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.OneToOne;
import java.util.Set;

/**
 * Бизнес сущность - Организация
 *
 * @author Ivanov Roman
 * @date 03.09.2019
 * @since 8
 **/
@Data
@Entity
public class Organization extends BaseEntity {
    private String name;
    @OneToOne
    @JoinColumn(name = "ACCOUNT_ID")
    private Address address;
    private String phone;
    @ManyToMany(mappedBy = "organizations")
    private Set<Employee> employeeSet;
}
