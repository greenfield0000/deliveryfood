package greenfield.group.com.journalservice.model.journal;

import lombok.Data;

import java.util.List;

/**
 * Класс-ответ данных журнала
 */
@Data
public class JournalData extends JournalMetadataCommon {
    private List<Object> rows;
    private int pageNumber;
}
