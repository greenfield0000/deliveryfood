package greenfield.group.com.journalservice.journal;

import java.util.List;

/**
 * Метаданные журнала
 */
public class JournalMetadata {
    private List<JournalButton> buttonList;
    private List<JournalColumn> columnList;
    private JournalFilter filter;

    public JournalMetadata() {
    }

    public List<JournalButton> getButtonList() {
        return buttonList;
    }

    public void setButtonList(List<JournalButton> buttonList) {
        this.buttonList = buttonList;
    }

    public List<JournalColumn> getColumnList() {
        return columnList;
    }

    public void setColumnList(List<JournalColumn> columnList) {
        this.columnList = columnList;
    }

    public JournalFilter getFilter() {
        return filter;
    }

    public void setFilter(JournalFilter filter) {
        this.filter = filter;
    }
}
