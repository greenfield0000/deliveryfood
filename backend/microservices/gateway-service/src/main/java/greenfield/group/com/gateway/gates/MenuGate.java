package greenfield.group.com.gateway.gates;

import greenfield.group.com.security.common.SimpleResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@CrossOrigin(origins = "http://localhost:4200/**")
@RestController
public class MenuGate extends Gate {

    @Autowired
    private RestTemplate restTemplate;

    @RequestMapping(path = "/menu-gate/getMenu", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public SimpleResult getMenu(@RequestBody String uuid) {
        return this.restTemplate
                .postForEntity(serviceRegistry.get(MENU_SERVICE) + "/getMenu", uuid, SimpleResult.class)
                .getBody();
    }

}
