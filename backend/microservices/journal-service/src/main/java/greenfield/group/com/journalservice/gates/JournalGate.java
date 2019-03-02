package greenfield.group.com.journalservice.gates;

import enums.Status;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import results.SimpleResult;

@CrossOrigin
@RestController(value = "/journal")
public class JournalGate {

    @RequestMapping(path = "/getJournal", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public SimpleResult<String> getJournal(@RequestBody String session) {
        return new SimpleResult<>(Status.OK, "jornal load is oK with session" + session);
    }

}
