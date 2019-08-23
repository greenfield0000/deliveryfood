package greenfield.group.com.journalservice.journal;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * Дескриптор колонки журнала
 */
@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class JournalColumn {
    private String headerName;
    private String field;
    private boolean sortable;
    private boolean filter;
    private boolean checkboxSelection;
}
