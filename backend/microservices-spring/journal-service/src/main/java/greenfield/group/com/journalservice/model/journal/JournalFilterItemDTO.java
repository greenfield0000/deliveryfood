package greenfield.group.com.journalservice.model.journal;

import greenfield.group.com.journalservice.model.journal.types.Type;
import lombok.Data;

/**
 * Дескриптор фильтрации журнала
 */
@Data
public class JournalFilterItemDTO {
    private String name;
    private Type type;
    private Object value;
}
