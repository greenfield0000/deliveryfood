package greenfield.group.com.gateway.gates.modeldto.kladr.context;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

/**
 * @author Ivanov Roman
 * @since 27.06.19
 **/
public class ResultContext {

    @JsonProperty("searchContext")
    RequestContext requestContext;
    @JsonProperty("result")
    List<ResponseContext> responseContexts;

    public RequestContext getRequestContext() {
        return requestContext;
    }

    public void setRequestContext(RequestContext requestContext) {
        this.requestContext = requestContext;
    }

    public List<ResponseContext> getResponseContexts() {
        return responseContexts;
    }

    public void setResponseContexts(List<ResponseContext> responseContexts) {
        this.responseContexts = responseContexts;
    }
}
