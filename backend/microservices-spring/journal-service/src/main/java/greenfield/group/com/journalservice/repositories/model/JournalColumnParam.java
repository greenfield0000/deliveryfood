package greenfield.group.com.journalservice.repositories.model;

import javax.persistence.*;

@Entity
@Table(name = "j_journal_column_param")
public class JournalColumnParam {

    @Id
    private Long id;
    @Column(name = "headername")
    private Long headerName;
    @Column(name = "field")
    private Long field;
    @Column(name = "sortable")
    private Boolean sortable;
    @Column(name = "filter")
    private Boolean filter;
    @Column(name = "checkboxselection")
    private Boolean checkboxselection;
    @ManyToOne
    @JoinColumn(name = "journalcolumndescrid")
    private JournalColumnDescription journalColumnDescription;

    public JournalColumnParam() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getHeaderName() {
        return headerName;
    }

    public void setHeaderName(Long headerName) {
        this.headerName = headerName;
    }

    public Long getField() {
        return field;
    }

    public void setField(Long field) {
        this.field = field;
    }

    public Boolean getSortable() {
        return sortable;
    }

    public void setSortable(Boolean sortable) {
        this.sortable = sortable;
    }

    public Boolean getFilter() {
        return filter;
    }

    public void setFilter(Boolean filter) {
        this.filter = filter;
    }

    public Boolean getCheckboxselection() {
        return checkboxselection;
    }

    public void setCheckboxselection(Boolean checkboxselection) {
        this.checkboxselection = checkboxselection;
    }

    public JournalColumnDescription getJournalColumnDescription() {
        return journalColumnDescription;
    }

    public void setJournalColumnDescription(JournalColumnDescription journalColumnDescription) {
        this.journalColumnDescription = journalColumnDescription;
    }
}
