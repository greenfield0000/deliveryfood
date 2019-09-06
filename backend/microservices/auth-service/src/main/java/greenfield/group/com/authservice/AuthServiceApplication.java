package greenfield.group.com.authservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@EnableJpaRepositories
@SpringBootApplication
@EntityScan("api")
@ComponentScan(basePackages = {
        "greenfield.group.com.gatewayutils",
        "greenfield.group.com.redisutils",
        "greenfield.group.com.authservice"
})
public class AuthServiceApplication {

    public static void main(String[] args) {
        SpringApplication
                .run(AuthServiceApplication.class, args);
    }
}


