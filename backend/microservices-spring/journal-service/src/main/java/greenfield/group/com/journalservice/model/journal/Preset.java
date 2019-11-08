package greenfield.group.com.journalservice.model.journal;

import lombok.Data;

/**
 * Пресет для журнала
 */
@Data
public class Preset {
    // название пресета
    private String name;
    // является ли пресет избранным
    private boolean isElected;
}
