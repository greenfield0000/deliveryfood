package greenfield.group.com.gateway.gates;

import api.journal.JournalMetadata;
import api.requests.LoadJournalRequest;
import greenfield.group.com.gatewayutils.results.SimpleResult;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:4200/**")
@RestController
public class JournalGate {

    /**
     * Метод загрузки метаданных-журнала согласно его системному имени
     *
     * @param loadJournalRequest запрос с интерфейса при загрузке журнала
     * @return
     */
    @RequestMapping(path = "/journal-gate/load", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public SimpleResult<JournalMetadata> load(@RequestBody LoadJournalRequest loadJournalRequest) {
        return new SimpleResult<>();
    }

}
