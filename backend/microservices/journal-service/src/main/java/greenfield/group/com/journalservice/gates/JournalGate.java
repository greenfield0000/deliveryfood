package greenfield.group.com.journalservice.gates;

import greenfield.group.com.gatewayutils.enums.Status;
import greenfield.group.com.gatewayutils.results.SimpleResult;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController(value = "/journal")
public class JournalGate {

    @RequestMapping(path = "/getJournal", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public SimpleResult<String> getJournal(@RequestBody String session) {
        return new SimpleResult<>(Status.OK, "jornal load is oK with session" + session);
    }

}
