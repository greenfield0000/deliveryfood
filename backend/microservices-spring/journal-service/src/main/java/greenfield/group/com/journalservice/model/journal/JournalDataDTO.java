package greenfield.group.com.journalservice.model.journal;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.List;


/**
 * Класс-ответ данных журнала
 */
@Data
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
public class JournalDataDTO extends JournalMetadataCommonDTO {
    private List<Object> rows;
    private int pageNumber;
}
