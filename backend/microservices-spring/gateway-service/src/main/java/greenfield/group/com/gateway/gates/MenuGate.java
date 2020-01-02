package greenfield.group.com.gateway.gates;

import greenfield.group.com.gatecommon.SimpleResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class MenuGate extends Gate {

    @Autowired
    private RestTemplate restTemplate;

    @RequestMapping(path = "/menu-gate/getMenu", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public SimpleResult getMenu(@RequestHeader(value = "Authorization", defaultValue = "") String authorization) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", authorization);
        HttpEntity<String> httpEntity = new HttpEntity<>(headers);
        return this.restTemplate
                .exchange(serviceRegistry.get(MENU_SERVICE) + "/getMenu", HttpMethod.GET, httpEntity, SimpleResult.class)
                .getBody();
    }

}
