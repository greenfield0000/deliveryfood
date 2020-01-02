package greenfield.group.com.gateway.gates;

import greenfield.group.com.gatecommon.SimpleResult;
import greenfield.group.com.gatecommon.Status;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

/**
 * Гейт для вызова журнальх методов
 */
@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class JournalGate extends Gate {

    @Autowired
    private RestTemplate restTemplate;

    /**
     * Общий вызывающий метод фунций журнала
     *
     * @param authorization HTTP-заголовок передаваемый с сервиса, который, как правило, должен содержать токен
     *                      авторизации
     * @param params        параметры вызова сервиса
     * @param gateName      имя гейта
     * @param methodName    имя метода
     * @param requestMethod тип HTTP-запроса
     * @return возвращает результат вызова сервиса согласно имени гейта и метода
     */
    private SimpleResult getSimpleResultCommon(String authorization,
                                               Map<String, Object> params,
                                               String gateName,
                                               String methodName,
                                               RequestMethod requestMethod) {

        if (methodName == null || methodName.isEmpty()) {
            return new SimpleResult(Status.OK, "Вызов метода невозможен");
        }
        params.put("requestMethod", requestMethod);

        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", authorization);
        HttpEntity<Map<String, Object>> httpEntity = new HttpEntity<>(params, headers);

        SimpleResult resultBody = new SimpleResult();
        switch (requestMethod) {
            case GET: {
                resultBody = this.restTemplate
                        .getForEntity(
                                serviceRegistry.get(gateName) + "/" + methodName, SimpleResult.class, httpEntity
                        )
                        .getBody();
                break;
            }
            case PUT: {
                resultBody = this.restTemplate
                        .exchange(serviceRegistry.get(gateName) + "/" + methodName, HttpMethod.PUT, httpEntity, SimpleResult.class)
                        .getBody();
                break;
            }
            case POST: {
                resultBody = this.restTemplate
                        .postForEntity(serviceRegistry.get(gateName) + "/" + methodName, httpEntity, SimpleResult.class)
                        .getBody();
                break;
            }
            case DELETE: {
                this.restTemplate
                        .exchange(serviceRegistry.get(gateName) + "/" + methodName, HttpMethod.DELETE, httpEntity, SimpleResult.class)
                        .getBody();
                break;
            }
        }

        return resultBody;
    }


    // TODO передалать во всех гейтах единный вызов сервисов

    /**
     * Вызов микросервиса журнала
     *
     * @param params запрос с интерфейса
     * @return
     */
    @RequestMapping(path = "/{gateName}/{methodName}", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public SimpleResult postCall(@RequestHeader(value = "Authorization", defaultValue = "") String authorization
            , @RequestBody Map<String, Object> params
            , @PathVariable final String gateName
            , @PathVariable final String methodName) {

        return getSimpleResultCommon(authorization, params, gateName, methodName, RequestMethod.POST);
    }

    /**
     * Вызов микросервиса журнала
     *
     * @param params запрос с интерфейса
     * @return
     */
    @RequestMapping(path = "/{gateName}/{methodName}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public SimpleResult getCall(@RequestHeader(value = "Authorization", defaultValue = "") String authorization
            , @RequestBody Map<String, Object> params
            , @PathVariable final String gateName
            , @PathVariable final String methodName
    ) {

        return getSimpleResultCommon(authorization, params, gateName, methodName, RequestMethod.POST);
    }

    /**
     * Вызов микросервиса журнала
     *
     * @param params запрос с интерфейса
     * @return
     */
    @RequestMapping(path = "/{gateName}/{methodName}", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE)
    public SimpleResult putCall(@RequestHeader(value = "Authorization", defaultValue = "") String authorization
            , @RequestBody Map<String, Object> params
            , @PathVariable final String gateName
            , @PathVariable final String methodName
    ) {

        return getSimpleResultCommon(authorization, params, gateName, methodName, RequestMethod.PUT);
    }

    /**
     * Вызов микросервиса журнала
     *
     * @param params запрос с интерфейса
     * @return
     */
    @RequestMapping(path = "/{gateName}/{methodName}", method = RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_VALUE)
    public SimpleResult deleteCall(@RequestHeader(value = "Authorization", defaultValue = "") String authorization
            , @RequestBody Map<String, Object> params
            , @PathVariable final String gateName
            , @PathVariable final String methodName
    ) {

        return getSimpleResultCommon(authorization, params, gateName, methodName, RequestMethod.DELETE);
    }


}
