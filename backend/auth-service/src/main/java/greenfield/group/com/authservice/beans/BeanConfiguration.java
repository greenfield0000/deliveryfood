package greenfield.group.com.authservice.beans;

import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;

/**
 * Конфигурация бина рест-темплейта
 */
public class BeanConfiguration {

    @Bean
    public RestTemplate getRestTemplate() {
        return new RestTemplate();
    }

}
