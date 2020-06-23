package greenfield.group.com.journalservice.requests;

import greenfield.group.com.journalservice.model.journal.JournalFilterItemDTO;
import lombok.Data;

import java.util.List;

/**
 * Запрос фильтрации журнала
 */
@Data
public class FilterRequest {
    private String sysName;
    private List<JournalFilterItemDTO> itemList;
}
