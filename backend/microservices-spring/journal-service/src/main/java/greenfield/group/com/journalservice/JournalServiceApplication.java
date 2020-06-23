package greenfield.group.com.journalservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories
public class JournalServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(JournalServiceApplication.class, args);
    }

}
