package greenfield.group.com.resource;

import greenfield.group.com.entity.User;
import greenfield.group.com.services.crud.impl.UserCrudService;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.List;

@Path("/personal")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class PersonalResource {

    @Inject
    UserCrudService<User> userCrudService;

    /**
     * Журнальный метод для загрузки данных журнала "Персонал"
     *
     * @return список ползователей системы
     */
    @GET
    @Path("/loadJournal")
    public List<User> loadJournal() {
        return userCrudService.findAll();
    }


    /**
     * Метод по созданию пользователя с последующей загрузкой всех сущесвующих пользователей
     *
     * @param user пользователь, которого стоит сохранить
     * @return список пользователей с только что сохраненным
     */
    @POST
    @Path("/create")
    public List<User> create(User user) {
        return userCrudService.create(user);
    }


    /**
     * Метод по удалению пользователя с последующей загрузкой всех сущесвующих пользователей
     *
     * @param user пользователь, которого стоит удалить
     * @return список пользователей с только что удаленным
     */
    @POST
    @Path("/delete")
    public List<User> delete(User user) {
        return userCrudService.delete(user);
    }

    /**
     * Метод по обновлению пользователя с последующей загрузкой всех сущесвующих пользователей
     *
     * @param user пользователь, которого стоит обновить
     * @return список пользователей с только что обновленым
     */
    @POST
    @Path("/update")
    public List<User> update(User user) {
        return userCrudService.update(user);
    }

}