package greenfield.group.com.journalservice.model.requests;

import lombok.Data;

/**
 * Модель запроса данных для журнала
 */
@Data
public class LoadJournalDataRequest {
    private int pageNumber;
}
