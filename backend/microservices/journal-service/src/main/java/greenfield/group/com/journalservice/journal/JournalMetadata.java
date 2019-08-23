package greenfield.group.com.journalservice.journal;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

/**
 * Метаданные журнала
 */
@Data
@Getter
@Setter
@NoArgsConstructor
@Document(collection = "journal")
public class JournalMetadata {
    @Id
    private String id;
    private List<JournalButton> buttonList;
    private JournalColumnMetaData columnMetaData;
    private JournalFilter filter;
}
