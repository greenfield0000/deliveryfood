package greenfield.group.com.journalservice.model.journal;

import lombok.*;

import java.util.List;

/**
 * Описание стукрутуры колонок
 */
@Data
public class JournalColumnMetaData {
    private String id;
    private String note;
    private String sysName;
    private List<String> ownerRole;
    private List<JournalColumn> list;
}
