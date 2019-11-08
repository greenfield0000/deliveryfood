package greenfield.group.com.journalservice.model.journal;

import lombok.*;

/**
 * Класс-описатель журнальной кнопки
 */

@Data
public class JournalButton {
    private String id;
    private String name;
    private String hint;
    private String cssImageName;
    private String handlerFnName;
}
