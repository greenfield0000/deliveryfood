package greenfield.group.com.journalservice.journal;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

/**
 * Описание стукрутуры колонок
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Document
public class JournalColumnMetaData {
    @Id
    private String id;
    private String note;
    private String sysName;
    private List<String> ownerRole;
    private List<JournalColumn> list;
}
