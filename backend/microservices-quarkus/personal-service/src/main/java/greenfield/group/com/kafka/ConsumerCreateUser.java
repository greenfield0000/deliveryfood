package greenfield.group.com.kafka;

import greenfield.group.com.model.User;
import greenfield.group.com.services.UserRepository;
import io.vertx.core.json.JsonObject;
import org.eclipse.microprofile.reactive.messaging.Incoming;

import javax.ejb.Stateless;
import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;

/**
 * Слушатель топика "Сооздание пользователя"
 */
@Stateless
@ApplicationScoped
public class ConsumerCreateUser {

    @Inject
    UserRepository repository;

    @Incoming(value = "create-user")
    public void listenCreateUser(JsonObject jsonObject) {
        User user = jsonObject.mapTo(User.class);
        // проверяем, есть ли такой пользователь
        String userUUID = user.getUuid();
        // добавляем, если такого нет
        if (!repository.isFindByUUID(userUUID)) {
            user.setId(null);
            repository.create(user);
            System.out.println("User not found. Created " + user.toString());
            return;
        }

        System.out.println("User is found. Not create!!! " + user.toString());

    }

}
