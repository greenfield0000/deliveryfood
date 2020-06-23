package greenfield.group.com.journalservice.repositories.model;

import javax.persistence.*;

@Entity
@Table(name = "j_journal_button")
public class JournalButton {
    @Id
    private Long id;
    @Column(name = "name")
    private String name;
    @Column(name = "hint")
    private String hint;
    @Column(name = "cssimagename")
    private String cssImageName;
    @Column(name = "handlerfnname")
    private String handlerFnName;
    @ManyToOne
    @JoinColumn(name = "journalid")
    private Journal journal;

    public JournalButton() {
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

    public String getHint() {
        return hint;
    }

    public void setHint(String hint) {
        this.hint = hint;
    }

    public String getCssImageName() {
        return cssImageName;
    }

    public void setCssImageName(String cssImageName) {
        this.cssImageName = cssImageName;
    }

    public String getHandlerFnName() {
        return handlerFnName;
    }

    public void setHandlerFnName(String handlerFnName) {
        this.handlerFnName = handlerFnName;
    }

    public Journal getJournal() {
        return journal;
    }

    public void setJournal(Journal journal) {
        this.journal = journal;
    }
}
