package api.journal;

import lombok.*;

/**
 * Класс-описатель журнальной кнопки
 */

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class JournalButton {
    private String id;
    private String name;
    private String hint;
    private String cssImageName;
    private String handlerFnName;
}
