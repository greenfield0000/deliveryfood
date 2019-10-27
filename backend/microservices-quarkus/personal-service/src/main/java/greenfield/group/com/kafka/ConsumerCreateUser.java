package greenfield.group.com.kafka;

import greenfield.group.com.model.User;
import greenfield.group.com.services.UserRepository;
import io.vertx.core.json.JsonObject;
import org.eclipse.microprofile.reactive.messaging.Incoming;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;

/**
 * Слушатель топика "Сооздание пользователя"
 */
@ApplicationScoped
public class ConsumerCreateUser {

    @Inject
    private UserRepository repository;

    @Incoming(value = "create-user")
    public void listenCreateUser(JsonObject jsonObject) {
        User user = jsonObject.mapTo(User.class);
        // проверяем, есть ли такой пользователь
        String userUUID = user.getUuid();
        // добавляем, если такого нет
        if (!repository.isFindByUUID(userUUID)) {
            repository.create(user);
            System.out.println("User not found. Created " + user.toString());
            return;
        }

        System.out.println("User is found. Not create!!! " + user.toString());

    }

}
