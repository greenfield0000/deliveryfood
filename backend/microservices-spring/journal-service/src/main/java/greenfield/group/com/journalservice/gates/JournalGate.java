package greenfield.group.com.journalservice.gates;

import greenfield.group.com.gatecommon.SimpleResult;
import greenfield.group.com.gatecommon.Status;
import greenfield.group.com.journalservice.services.JournalService;
import greenfield.group.com.journalservice.journal.JournalMetadata;
import greenfield.group.com.journalservice.requests.LoadJournalRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController(value = "/journal")
public class JournalGate {

    @Autowired
    private JournalService journalService;

    /**
     * Метод загрузки метаданных-журнала согласно его системному имени
     *
     * @param loadJournalRequest запрос с интерфейса при загрузке журнала
     * @return
     */
    @RequestMapping(path = "/load", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public SimpleResult<JournalMetadata> load(@RequestBody LoadJournalRequest loadJournalRequest) {
        return new SimpleResult<>(
                Status.OK, journalService.loadJournal(loadJournalRequest.getSysName())
        );
    }
}
