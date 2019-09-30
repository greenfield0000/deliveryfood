package greenfield.group.com.authservice;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {
        "greenfield.group.com.security",
        "greenfield.group.com.authservice"
})
@EntityScan("greenfield.group.com.model")
public class AuthServiceApplication {

    public static void main(String[] args) {
        SpringApplication
                .run(AuthServiceApplication.class, args);
    }
}


