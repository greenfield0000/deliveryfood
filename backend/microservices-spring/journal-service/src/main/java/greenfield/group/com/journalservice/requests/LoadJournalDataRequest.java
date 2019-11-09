package greenfield.group.com.journalservice.requests;

import lombok.Data;

/**
 * Модель запроса данных для журнала
 */
@Data
public class LoadJournalDataRequest {
    private int pageNumber;
}
