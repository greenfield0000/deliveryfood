package greenfield.group.com.menuservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@EnableMongoRepositories
@SpringBootApplication
@ComponentScan(basePackages = {
        "greenfield.group.com.gatewayutils",
        "greenfield.group.com.menuservice",
        "greenfield.group.com.redisutils.redis"
})
public class MenuServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(MenuServiceApplication.class, args);
    }

}

