package greenfield.group.com.journalservice.requests;

import greenfield.group.com.journalservice.model.journal.PresetDTO;
import lombok.Data;

/**
 * Параметры вызова сохранения пресета
 *
 * @author Ivanov Roman
 * @date 09.11.2019
 * @since 8
 **/
@Data
public class SavePresetRequest {
    private PresetDTO presetDTO;
}
