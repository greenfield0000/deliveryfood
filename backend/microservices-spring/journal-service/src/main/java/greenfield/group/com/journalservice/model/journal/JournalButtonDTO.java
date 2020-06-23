package greenfield.group.com.journalservice.model.journal;

import lombok.Data;
import lombok.experimental.SuperBuilder;

/**
 * Класс-описатель журнальной кнопки
 */

@Data
@SuperBuilder
public class JournalButtonDTO {
    private String id;
    private String name;
    private String hint;
    private String cssImageName;
    private String handlerFnName;
}
