package greenfield.group.com;

import greenfield.group.com.model.User;
import greenfield.group.com.services.UserRepository;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.List;

@Path("/personal")
public class Gate {

    @Inject
    private UserRepository userRepository;

    /**
     * Журнальный метод для загрузки данных журнала "Персонал"
     *
     * @return список ползователей системы
     */
    @GET
    @Path("/loadJournal")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public List<User> loadJournal() {
        return userRepository.findAll();
    }


    /**
     * Метод по созданию пользователя с последующей загрузкой всех сущесвующих пользователей
     *
     * @param user пользователь, которого стоит сохранить
     * @return список пользователей с только что сохраненным
     */
    @POST
    @Path("/create")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public List<User> create(User user) {
        return userRepository.create(user);
    }


    /**
     * Метод по удалению пользователя с последующей загрузкой всех сущесвующих пользователей
     *
     * @param user пользователь, которого стоит удалить
     * @return список пользователей с только что удаленным
     */
    @DELETE
    @Path("/delete")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public List<User> delete(User user) {
        return userRepository.delete(user);
    }

    /**
     * Метод по обновлению пользователя с последующей загрузкой всех сущесвующих пользователей
     *
     * @param user пользователь, которого стоит обновить
     * @return список пользователей с только что обновленым
     */
    @PUT
    @Path("/update")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public List<User> update(User user) {
        return userRepository.update(user);
    }

}