package greenfield.group.com.journalservice.model.requests;

import greenfield.group.com.journalservice.model.journal.JournalFilterItem;
import lombok.Data;

import java.util.List;

/**
 * Запрос фильтрации журнала
 */
@Data
public class FilterRequest {
    private String sysName;
    private List<JournalFilterItem> itemList;
}
