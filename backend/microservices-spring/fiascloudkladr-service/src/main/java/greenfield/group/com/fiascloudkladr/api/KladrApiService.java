package greenfield.group.com.fiascloudkladr.api;

import greenfield.group.com.fiascloudkladr.context.RequestContext;
import greenfield.group.com.fiascloudkladr.context.ResponseContext;
import greenfield.group.com.fiascloudkladr.context.ResultContext;
import greenfield.group.com.fiascloudkladr.exception.KladrApiServiceException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Главный класс, который строит запрос в соответствии с передаваемыми параметрами
 *
 * @author Ivanov Roman
 * @date 27.06.19
 * @since 8
 **/
@Service
public class KladrApiService {

    @Autowired
    private RestTemplate restTemplate;

    /**
     * Основной метод для вызова АПИ
     *
     * @return
     * @throws KladrApiServiceException
     */
    public ResultContext call(RequestContext context) throws KladrApiServiceException {
        if (context == null) {
            throw new KladrApiServiceException("Query null or empty");
        }

        final ResultContext resultContext = restTemplate
                .getForObject(context.requestBuild(), ResultContext.class);

        // т.к. это бесплатная версия, то стоит отфильтровать первый item
        if (resultContext != null) {
            List<ResponseContext> responseContextList = resultContext.getResponseContexts();
            if (responseContextList != null) {
                responseContextList = responseContextList.stream()
                        .filter(content -> !content.getId().equalsIgnoreCase("free"))
                        .collect(Collectors.toList());
                resultContext.setResponseContexts(responseContextList);
            }
        }

        return resultContext;
    }

}
