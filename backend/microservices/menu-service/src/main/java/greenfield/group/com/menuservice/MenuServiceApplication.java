package greenfield.group.com.menuservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@EnableMongoRepositories
@SpringBootApplication
@ComponentScan(basePackages = {
        "greenfield.group.com.security",
        "greenfield.group.com.menuservice"
})
@EntityScan({"greenfield.group.com.model"})
@EnableJpaRepositories(basePackages = "greenfield.group.com.security.repository")
public class MenuServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(MenuServiceApplication.class, args);
    }

}

