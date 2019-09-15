package greenfield.group.com.gateway.gates;

import api.journal.JournalMetadata;
import api.requests.LoadJournalRequest;
import greenfield.group.com.gatecommon.SimpleResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class JournalGate extends Gate {

    @Autowired
    private RestTemplate restTemplate;

    /**
     * Метод загрузки метаданных-журнала согласно его системному имени
     *
     * @param loadJournalRequest запрос с интерфейса при загрузке журнала
     * @return
     */
    @RequestMapping(path = "/journal-gate/load", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public SimpleResult<JournalMetadata> load(@RequestBody LoadJournalRequest loadJournalRequest) {
        return this.restTemplate
                .postForEntity(serviceRegistry.get(JOURNAL_SERVICE) + "/getRegion", loadJournalRequest, SimpleResult.class)
                .getBody();
    }

}
