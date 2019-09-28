package greenfield.group.com.model.journal;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

/**
 * Метаданные журнала
 */
@Data
@Getter
@Setter
@NoArgsConstructor
public class JournalMetadata {
    private String id;
    private List<JournalButton> buttonList;
    private JournalColumnMetaData columnMetaData;
    private JournalFilter filter;
}
