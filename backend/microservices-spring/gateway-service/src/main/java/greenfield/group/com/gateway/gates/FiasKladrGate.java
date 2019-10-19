package greenfield.group.com.gateway.gates;

import greenfield.group.com.gateway.gates.modeldto.kladr.context.RequestContext;
import greenfield.group.com.gateway.gates.modeldto.kladr.context.ResultContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class FiasKladrGate extends Gate {

    @Autowired
    private RestTemplate restTemplate;

    @RequestMapping(path = "/kladr-gate/getRegion", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResultContext getRegion(@RequestBody RequestContext requestContext) {
        RequestContext context = new RequestContext(requestContext);
        return this.restTemplate
                .postForEntity(serviceRegistry.get(KLADR_SERVICE) + "/getRegion", context, ResultContext.class)
                .getBody();
    }

    @RequestMapping(path = "/kladr-gate/getDistrict", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResultContext getDistrict(@RequestBody RequestContext requestContext) {
        RequestContext context = new RequestContext(requestContext);
        return this.restTemplate
                .postForEntity(serviceRegistry.get(KLADR_SERVICE) + "/getDistrict", context, ResultContext.class)
                .getBody();
    }

    @RequestMapping(path = "/kladr-gate/getCity", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResultContext getCity(@RequestBody RequestContext requestContext) {
        RequestContext context = new RequestContext(requestContext);
        return this.restTemplate
                .postForEntity(serviceRegistry.get(KLADR_SERVICE) + "/getCity", context, ResultContext.class)
                .getBody();
    }

    @RequestMapping(path = "/kladr-gate/getStreet", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResultContext getStreet(@RequestBody RequestContext requestContext) {
        RequestContext context = new RequestContext(requestContext);
        return this.restTemplate
                .postForEntity(serviceRegistry.get(KLADR_SERVICE) + "/getStreet", context, ResultContext.class)
                .getBody();
    }

    @RequestMapping(path = "/kladr-gate/getBuilding", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResultContext getBuilding(@RequestBody RequestContext requestContext) {
        RequestContext context = new RequestContext(requestContext);
        return this.restTemplate
                .postForEntity(serviceRegistry.get(KLADR_SERVICE) + "/getBuilding", context, ResultContext.class)
                .getBody();
    }

}
