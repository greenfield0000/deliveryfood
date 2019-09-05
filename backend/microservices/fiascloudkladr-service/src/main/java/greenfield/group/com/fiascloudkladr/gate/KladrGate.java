package greenfield.group.com.fiascloudkladr.gate;

import greenfield.group.com.fiascloudkladr.api.KladrApiService;
import api.context.RequestContext;
import api.context.ResultContext;
import api.exception.KladrApiServiceException;
import api.types.ContentType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;


/**
 * Точка входа в кладр
 *
 * @author Ivanov Roman
 * @date 27.06.19
 * @since 8
 **/
@CrossOrigin
@RestController(value = "/kladr")
public class KladrGate {

    @Autowired
    private KladrApiService kladrApiService;

    /**
     * Вызов апи кладра
     *
     * @return
     */
    private ResultContext kladrCall(RequestContext context) {
        ResultContext ResultContext = null;
        try {
            ResultContext = kladrApiService.call(context);
        } catch (KladrApiServiceException e) {
            // not implemented
        }
        return ResultContext;
    }

    @RequestMapping(path = "/getRegion", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResultContext getRegion(@RequestBody RequestContext requestContext) {
        RequestContext context = new RequestContext(requestContext);
        context.setContentType(ContentType.region);
        return kladrCall(context);
    }

    @RequestMapping(path = "/getDistrict", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResultContext getDistrict(@RequestBody RequestContext requestContext) {
        RequestContext context = new RequestContext(requestContext);
        context.setContentType(ContentType.district);
        return kladrCall(context);
    }

    @RequestMapping(path = "/getCity", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResultContext getCity(@RequestBody RequestContext requestContext) {
        RequestContext context = new RequestContext(requestContext);
        context.setContentType(ContentType.city);
        return kladrCall(context);
    }

    @RequestMapping(path = "/getStreet", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResultContext getStreet(@RequestBody RequestContext requestContext) {
        RequestContext context = new RequestContext(requestContext);
        context.setContentType(ContentType.street);
        return kladrCall(context);
    }

    @RequestMapping(path = "/getBuilding", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResultContext getBuilding(@RequestBody RequestContext requestContext) {
        RequestContext context = new RequestContext(requestContext);
        context.setContentType(ContentType.building);
        return kladrCall(context);
    }

}
