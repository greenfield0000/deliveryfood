package greenfield.group.com.model;

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
@Table(name = "B_ORGANIZATION")
public class Organization extends BaseEntity {
    private String name;
//    private Address address;
    private String phone;
    @ManyToMany(mappedBy = "organizations")
    private Set<Employee> employeeSet;

    public Organization() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public Set<Employee> getEmployeeSet() {
        return employeeSet;
    }

    public void setEmployeeSet(Set<Employee> employeeSet) {
        this.employeeSet = employeeSet;
    }
}
