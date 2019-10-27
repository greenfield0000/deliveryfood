package greenfield.group.com;

import greenfield.group.com.model.User;
import greenfield.group.com.services.UserRepository;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.util.List;

@Path("/personal")
public class Gate {

    @Inject
    UserRepository userRepository;

    @GET
    @Path("/findAll")
    @Produces(MediaType.APPLICATION_JSON)
    public List<User> findAllUser() {
        User user = new User();
        user.setName("ТестовыйПервый");
        user.setSurName("ТестовыйПервыйФ");
        userRepository.create(user);
        return userRepository.findAll();
    }
}