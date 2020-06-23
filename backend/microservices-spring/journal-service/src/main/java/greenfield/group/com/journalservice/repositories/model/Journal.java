package greenfield.group.com.journalservice.repositories.model;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "j_journal")
public class Journal {
    @Id
    private Long id;
    @Column(name = "name")
    private String name;
    @Column(name = "sysname")
    private String sysName;
    @Column(name = "servicename")
    private String serviceName;
    @Column(name = "gatename")
    private String gateName;
    @OneToMany(mappedBy = "journal", fetch = FetchType.EAGER)
    private Set<JournalButton> buttonSet = new HashSet<>();
    @OneToOne(mappedBy = "journal", fetch = FetchType.EAGER)
    private JournalColumnDescription journalColumnDescription;

    public Journal() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSysName() {
        return sysName;
    }

    public void setSysName(String sysName) {
        this.sysName = sysName;
    }

    public String getServiceName() {
        return serviceName;
    }

    public void setServiceName(String serviceName) {
        this.serviceName = serviceName;
    }

    public String getGateName() {
        return gateName;
    }

    public void setGateName(String gateName) {
        this.gateName = gateName;
    }

    public Set<JournalButton> getButtonSet() {
        return buttonSet;
    }

    public void setButtonSet(Set<JournalButton> buttonSet) {
        this.buttonSet = buttonSet;
    }

    public JournalColumnDescription getJournalColumnDescription() {
        return journalColumnDescription;
    }

    public void setJournalColumnDescription(JournalColumnDescription journalColumnDescription) {
        this.journalColumnDescription = journalColumnDescription;
    }
}
