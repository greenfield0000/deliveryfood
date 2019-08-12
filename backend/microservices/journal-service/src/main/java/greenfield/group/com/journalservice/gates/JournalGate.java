package greenfield.group.com.journalservice.gates;

import greenfield.group.com.gatewayutils.enums.Status;
import greenfield.group.com.gatewayutils.results.SimpleResult;
import greenfield.group.com.journalservice.gates.request.LoadJournalRequest.LoadJournalRequest;
import greenfield.group.com.journalservice.journal.JournalButton;
import greenfield.group.com.journalservice.journal.JournalColumn;
import greenfield.group.com.journalservice.journal.JournalMetadata;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;

@CrossOrigin
@RestController(value = "/journal")
public class JournalGate {
    /**
     * Метод загрузки метаданных-журнала согласно его системному имени
     *
     * @param loadJournalRequest запрос с интерфейса при загрузке журнала
     * @return
     */
    @RequestMapping(path = "/load", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public SimpleResult<JournalMetadata> load(@RequestBody LoadJournalRequest loadJournalRequest) {
        final JournalMetadata journalMetadata = new JournalMetadata();
        final JournalButton journalButton = new JournalButton();
        journalButton.setCssImageName("filter-btn");
        journalButton.setHandlerFnName("TestHandlerFnName");
        journalButton.setHint("TestHint");
        journalButton.setName("TestName");
        journalMetadata.setButtonList(Collections.singletonList(journalButton));
        final JournalColumn journalColumn = new JournalColumn();
        journalColumn.setSortable(false);
        journalColumn.setField("TestField");
        journalColumn.setCheckboxSelection(false);
        journalColumn.setHeaderName("TestHeaderName");
        journalColumn.setFilter(false);
        journalMetadata.setColumnList(Collections.singletonList(journalColumn));
        return new SimpleResult<>(Status.OK, journalMetadata);
    }

}
