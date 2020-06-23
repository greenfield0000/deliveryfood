package greenfield.group.com.journalservice.response;


import greenfield.group.com.journalservice.model.journal.JournalDataDTO;
import lombok.Data;

import java.util.List;

/**
 * Ответ наружу
 */
@Data
public class JournalDataResponse {

    private final List<Object> rows;
    private final int pageNumber;

    public JournalDataResponse(JournalDataDTO journalData) {
        this.rows = journalData.getRows();
        this.pageNumber = journalData.getPageNumber();
    }
}
