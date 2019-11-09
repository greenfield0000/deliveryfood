package greenfield.group.com.journalservice.response;


import greenfield.group.com.journalservice.model.journal.JournalData;
import lombok.Data;

import java.util.List;

/**
 * Ответ наружу
 */
@Data
public class JournalDataResponse {

    private final List<Object> rows;
    private final int pageNumber;

    public JournalDataResponse(JournalData journalData) {
        this.rows = journalData.getRows();
        this.pageNumber = journalData.getPageNumber();
    }
}
