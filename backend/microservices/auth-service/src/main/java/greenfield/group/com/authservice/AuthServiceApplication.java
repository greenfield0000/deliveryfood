package greenfield.group.com.authservice;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@Slf4j
@SpringBootApplication
@EntityScan("api")
@ComponentScan(basePackages = {
        "greenfield.group.com.security",
        "greenfield.group.com.authservice"
})
@EnableJpaRepositories(basePackages = "greenfield.group.com.security.repository")
public class AuthServiceApplication {

    public static void main(String[] args) {
        SpringApplication
                .run(AuthServiceApplication.class, args);
    }
}


