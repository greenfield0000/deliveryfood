package greenfield.group.com.authservice.configurations;

import api.Account;
import api.Address;
import api.Role;
import api.User;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

/**
 * Конфигурация бинов микросервиса
 */
@Configuration
public class BeanConfiguration {

    // Create a bean for restTemplate to call services
    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }

    @Bean
    public ObjectMapper objectMapper() {
        return new ObjectMapper();
    }

    @Bean
    public Account account() {
        return new Account();
    }

    @Bean
    public Address address() {
        return new Address();
    }

    @Bean
    public Role role() {
        return new Role();
    }

    @Bean
    public User user() {
        return new User();
    }

}
