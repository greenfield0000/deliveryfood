package greenfield.group.com.menuservice.configurations;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

/**
 * Конфигурация бинов микросервиса
 */
@Configuration
public class BeanConfigurations {

    // Create a bean for restTemplate to call services
    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }

}
