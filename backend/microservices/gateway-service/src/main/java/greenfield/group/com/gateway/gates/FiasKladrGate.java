package greenfield.group.com.gateway.gates;

import api.context.RequestContext;
import api.types.ContentType;
import org.hibernate.result.spi.ResultContext;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:4200/**")
@RestController
public class FiasKladrGate {

    @RequestMapping(path = "/kladr-gate/getRegion", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResultContext getRegion(@RequestBody RequestContext requestContext) {
        RequestContext context = new RequestContext(requestContext);
        context.setContentType(ContentType.region);
        return null;
    }

    @RequestMapping(path = "/kladr-gate/getDistrict", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResultContext getDistrict(@RequestBody RequestContext requestContext) {
        RequestContext context = new RequestContext(requestContext);
        context.setContentType(ContentType.district);
        return null;
    }

    @RequestMapping(path = "/kladr-gate/getCity", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResultContext getCity(@RequestBody RequestContext requestContext) {
        RequestContext context = new RequestContext(requestContext);
        context.setContentType(ContentType.city);
        return null;
    }

    @RequestMapping(path = "/kladr-gate/getStreet", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResultContext getStreet(@RequestBody RequestContext requestContext) {
        RequestContext context = new RequestContext(requestContext);
        context.setContentType(ContentType.street);
        return null;
    }

    @RequestMapping(path = "/kladr-gate/getBuilding", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResultContext getBuilding(@RequestBody RequestContext requestContext) {
        RequestContext context = new RequestContext(requestContext);
        context.setContentType(ContentType.building);
        return null;
    }

}
