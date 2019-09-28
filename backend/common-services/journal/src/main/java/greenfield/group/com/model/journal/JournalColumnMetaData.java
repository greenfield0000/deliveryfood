package greenfield.group.com.model.journal;

import lombok.*;

import java.util.List;

/**
 * Описание стукрутуры колонок
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class JournalColumnMetaData {
    private String id;
    private String note;
    private String sysName;
    private List<String> ownerRole;
    private List<JournalColumn> list;
}
