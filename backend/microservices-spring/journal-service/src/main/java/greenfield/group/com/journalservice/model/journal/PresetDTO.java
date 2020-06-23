package greenfield.group.com.journalservice.model.journal;

import lombok.Data;

import java.util.List;

/**
 * Пресет для журнала
 */
@Data
public class PresetDTO {
    // название пресета
    private String name;
    // является ли пресет избранным
    private boolean isElected;
    private List<JournalFilterItemDTO> itemList;
}
