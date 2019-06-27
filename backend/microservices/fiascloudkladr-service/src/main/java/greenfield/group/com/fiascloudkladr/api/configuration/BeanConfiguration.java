package greenfield.group.com.fiascloudkladr.api.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

/**
 * Конфигурация для хранения настроек бинов
 *
 * @author Ivanov Roman
 * @since 27.06.19
 **/
@Configuration
public class BeanConfiguration {

    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }


}
