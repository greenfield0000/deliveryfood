package greenfield.group.com;

import greenfield.group.com.model.User;
import greenfield.group.com.services.UserRepository;

import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.util.List;

@Path("/personal")
public class Gate {

    @Inject
    private UserRepository userRepository;

    @GET
    @Path("/loadJournal")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public List<User> loadJournal() {
        return userRepository.findAll();
    }
}