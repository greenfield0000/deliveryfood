package greenfield.group.com.authservice.kafka;


import greenfield.group.com.authservice.model.User;
import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.clients.producer.ProducerRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class KafkaSenderService {

    @Autowired
    private KafkaTemplate<String, User> kafkaTemplate;

    @Value("${app.topic}")
    private String topic;

    public void send(User user) {
        if (user != null) {
            log.info("sending message='{}' to topic='{}'", user, topic);
            ProducerRecord record = new ProducerRecord(topic, user);
            kafkaTemplate.send(record)
                    .addCallback(
                            s -> System.out.println("succses"),
                            ex -> System.out.println("exceptionsssss " + ex)
                    );
        }
    }
}
