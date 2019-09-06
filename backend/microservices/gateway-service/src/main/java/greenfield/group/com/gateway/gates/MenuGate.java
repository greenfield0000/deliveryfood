package greenfield.group.com.gateway.gates;

import greenfield.group.com.gatewayutils.enums.Status;
import greenfield.group.com.gatewayutils.results.SimpleResult;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:4200/**")
@RestController
public class MenuGate {
    @RequestMapping(path = "/menu-gate/getMenu", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public SimpleResult<String> getMenu(@RequestBody String uuid) {
        return new SimpleResult<>(Status.OK,"");
    }

}
