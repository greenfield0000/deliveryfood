package greenfield.group.com.journalservice.journal;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * Класс-описатель журнальной кнопки
 */

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "journal-button")
public class JournalButton {
    @Id
    private String id;
    private String name;
    private String hint;
    private String cssImageName;
    private String handlerFnName;
}
