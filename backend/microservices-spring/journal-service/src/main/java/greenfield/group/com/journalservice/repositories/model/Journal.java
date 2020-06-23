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
    private Long name;
    @Column(name = "sysname")
    private Long sysName;
    @Column(name = "servicename")
    private Long serviceName;
    @Column(name = "gatename")
    private Long gateName;
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

    public Long getName() {
        return name;
    }

    public void setName(Long name) {
        this.name = name;
    }

    public Long getSysName() {
        return sysName;
    }

    public void setSysName(Long sysName) {
        this.sysName = sysName;
    }

    public Long getGateName() {
        return gateName;
    }

    public void setGateName(Long gateName) {
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

    public Long getServiceName() {
        return serviceName;
    }

    public void setServiceName(Long serviceName) {
        this.serviceName = serviceName;
    }
}
