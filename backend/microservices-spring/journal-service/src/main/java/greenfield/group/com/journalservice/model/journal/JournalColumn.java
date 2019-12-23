package greenfield.group.com.journalservice.model.journal;

import lombok.Data;

/**
 * Дескриптор колонки журнала
 */
@Data
public class JournalColumn {
    private String headerName;
    private String field;
    private boolean sortable;
    private boolean filter;
    private boolean checkboxSelection;
}
