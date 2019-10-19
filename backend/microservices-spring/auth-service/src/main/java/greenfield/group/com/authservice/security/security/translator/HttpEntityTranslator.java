package greenfield.group.com.authservice.security.security.translator;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;

/**
 * Транслятор заголовков запроса.
 *
 * @author Ivanov Roman
 * @date 28/09/2019
 * @since 8
 */
public class HttpEntityTranslator {

    /**
     * Метод по созданию http сущности, для передачи ее в restTemplate.
     * Данная сущность необходима для передачи дальше http-заголовка запроса,
     * т.к. при обычном вызове заголовки теряются. При потерянных заголовках
     * работа будет невозможна, т.к. заголовок может содержать токен авторизации.
     * <p>
     * Следует использовать для методов, которые требуют авторизации
     *
     * @param authorization значение токена авторизации
     * @param params        параметры, с которыми вызван метод общего гейта
     * @return
     */
    public static <T> HttpEntity<T> buildHttpEntity(String authorization, T params) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", authorization);
        return new HttpEntity<T>(params, headers);
    }
}
