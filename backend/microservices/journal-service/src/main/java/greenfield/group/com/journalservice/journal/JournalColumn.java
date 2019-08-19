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
@Document(collection = "journal-column")
public class JournalColumn {
    @Id
    private String id;
    private String headerName;
    private String field;
    private boolean sortable;
    private boolean filter;
    private boolean checkboxSelection;
}
