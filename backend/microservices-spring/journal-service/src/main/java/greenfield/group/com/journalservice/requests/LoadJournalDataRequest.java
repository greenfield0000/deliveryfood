package greenfield.group.com.journalservice.requests;

import lombok.Data;

import java.util.Map;

/**
 * Модель запроса данных для журнала
 */
@Data
public class LoadJournalDataRequest {
    private Map<String, Object> entity;
    private int pageNumber;
}
