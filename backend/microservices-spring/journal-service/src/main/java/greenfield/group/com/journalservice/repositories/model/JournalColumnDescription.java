package greenfield.group.com.journalservice.repositories.model;

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
    @OneToOne(fetch = FetchType.LAZY)
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

    public void setNote(String note) {
        this.note = note;
    }

    public Journal getJournal() {
        return journal;
    }

    public void setJournal(Journal journal) {
        this.journal = journal;
    }

    public Set<JournalColumnParam> getJournalColumnParams() {
        return journalColumnParams;
    }
}

