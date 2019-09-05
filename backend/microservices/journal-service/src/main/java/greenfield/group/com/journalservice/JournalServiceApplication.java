package greenfield.group.com.journalservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;


@EnableMongoRepositories
@ComponentScan(basePackages = {
        "greenfield.group.com.gatewayutils"
})
@SpringBootApplication
public class JournalServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(JournalServiceApplication.class, args);
    }

}
