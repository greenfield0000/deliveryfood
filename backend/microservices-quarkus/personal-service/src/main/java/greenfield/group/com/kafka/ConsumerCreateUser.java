package greenfield.group.com.kafka;

import greenfield.group.com.model.User;
import io.vertx.core.json.JsonObject;
import org.eclipse.microprofile.reactive.messaging.Incoming;

import javax.enterprise.context.ApplicationScoped;
import java.util.Date;

@ApplicationScoped
public class ConsumerCreateUser {

    @Incoming(value = "create-user")
    public void listenCreateUser(JsonObject jsonObject) {
        User user = jsonObject.mapTo(User.class);
        System.out.println(user.toString() + " " + new Date());
    }

}
