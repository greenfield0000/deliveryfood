package documents;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * Основное описание сущности журнала
 */
@Document
public class Journal {
    @Id
    private Long id;
    private JournalButton journalButton;

    public Journal() {
    }

    public Journal(Long id, JournalButton journalButton) {
        this.id = id;
        this.journalButton = journalButton;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public JournalButton getJournalButton() {
        return journalButton;
    }

    public void setJournalButton(JournalButton journalButton) {
        this.journalButton = journalButton;
    }

    @Override
    public String toString() {
        return "Journal{" +
                "id=" + id +
                ", journalButton=" + journalButton +
                '}';
    }
}
