package api.journal;

import lombok.*;

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
