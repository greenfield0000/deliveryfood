package greenfield.group.com.journalservice.model.journal;

import lombok.Data;

import java.util.List;

/**
 * Описание стукрутуры колонок
 */
@Data
public class JournalColumnMetaDataDTO {
    private String id;
    private String note;
    private String sysName;
    private List<String> ownerRole;
    private List<JournalColumnDTO> list;
}
