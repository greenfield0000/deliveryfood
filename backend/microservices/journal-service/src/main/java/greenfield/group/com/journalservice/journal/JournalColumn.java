package greenfield.group.com.journalservice.journal;

/**
 * Дескриптор колонки журнала
 */
public class JournalColumn {
    private String headerName;
    private String field;
    private boolean sortable;
    private boolean filter;
    private boolean checkboxSelection;

    public JournalColumn() {
    }

    public String getHeaderName() {
        return headerName;
    }

    public void setHeaderName(String headerName) {
        this.headerName = headerName;
    }

    public String getField() {
        return field;
    }

    public void setField(String field) {
        this.field = field;
    }

    public boolean isSortable() {
        return sortable;
    }

    public void setSortable(boolean sortable) {
        this.sortable = sortable;
    }

    public boolean isFilter() {
        return filter;
    }

    public void setFilter(boolean filter) {
        this.filter = filter;
    }

    public boolean isCheckboxSelection() {
        return checkboxSelection;
    }

    public void setCheckboxSelection(boolean checkboxSelection) {
        this.checkboxSelection = checkboxSelection;
    }
}
