package greenfield.group.com.journalservice.model.journal;

import lombok.Data;
import lombok.experimental.SuperBuilder;

/**
 * Дескриптор колонки журнала
 */
@Data
@SuperBuilder
public class JournalColumnDTO {
    private String headerName;
    private String field;
    private boolean sortable;
    private boolean filter;
    private boolean checkboxSelection;
}
