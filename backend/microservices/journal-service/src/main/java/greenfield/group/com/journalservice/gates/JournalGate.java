package greenfield.group.com.journalservice.gates;

import greenfield.group.com.gatewayutils.enums.Status;
import greenfield.group.com.gatewayutils.results.SimpleResult;
import greenfield.group.com.journalservice.gates.request.LoadJournalRequest.LoadJournalRequest;
import greenfield.group.com.journalservice.journal.JournalMetadata;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

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
        return new SimpleResult<>(Status.OK, new JournalMetadata());
    }

}
