package greenfield.group.com.fiascloudkladr.context;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * @author Ivanov Roman
 * @since 27.06.19
 **/
@Data
@AllArgsConstructor
@NoArgsConstructor
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
