package greenfield.group.com.menuservice.repository.model;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "j_journal_column_description")
public class JournalColumnDescription {
    @Id
    private Long id;
    @Column(name = "note")
    private String note;
    @OneToOne
    @JoinColumn(name = "journalid")
    private Journal journal;
    @OneToMany(mappedBy = "journalColumnDescription", fetch = FetchType.EAGER)
    private final Set<JournalColumnParam> journalColumnParams = new HashSet<>();

    public JournalColumnDescription() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String name) {
        this.note = name;
    }

    public Journal getJournal() {
        return journal;
    }

    public void setJournal(Journal journal) {
        this.journal = journal;
    }
}

