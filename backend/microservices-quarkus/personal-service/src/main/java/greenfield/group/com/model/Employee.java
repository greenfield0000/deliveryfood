package greenfield.group.com.model;

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
@PrimaryKeyJoinColumn(name = "EMPLOYEE_ID")
@Table(name = "B_EMPLOYEE")
public class Employee extends User {
    @ManyToMany(cascade = {CascadeType.ALL})
    @JoinTable(
            name = "B_ORGANIZATION_EMPLOYEE",
            joinColumns = {@JoinColumn(name = "EMPLOYEE_ID")},
            inverseJoinColumns = {@JoinColumn(name = "ORGANIZATION_ID")}
    )
    private Set<Organization> organizations = new HashSet<>();
    private String tabNum;
    @Enumerated
    private EmployeeRole role;

    public Employee() {
    }

    public Set<Organization> getOrganizations() {
        return organizations;
    }

    public void setOrganizations(Set<Organization> organizations) {
        this.organizations = organizations;
    }

    public String getTabNum() {
        return tabNum;
    }

    public void setTabNum(String tabNum) {
        this.tabNum = tabNum;
    }

    public EmployeeRole getRole() {
        return role;
    }

    public void setRole(EmployeeRole role) {
        this.role = role;
    }
}
