package greenfield.group.com.kitchenservice.resources;

import greenfield.group.com.kitchenservice.lexa.Detail;
import greenfield.group.com.kitchenservice.lexa.Master;
import greenfield.group.com.kitchenservice.model.Dish;
import greenfield.group.com.kitchenservice.services.DishService;
import org.eclipse.microprofile.openapi.annotations.OpenAPIDefinition;
import org.eclipse.microprofile.openapi.annotations.info.Info;
import org.eclipse.microprofile.openapi.annotations.servers.Server;

import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.List;
import java.util.Random;
import java.util.Set;

@Path("/kitchen")
@OpenAPIDefinition(info = @Info(title = "Микросервис Кухня", version = "1.0.0"), servers = @Server(url = "localhost:8085"))
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@Transactional
public class DishResource {

    @Inject
    DishService dishService;

    /**
     * Журнальный метод для загрузки данных журнала "Персонал"
     *
     * @return список ползователей системы
     */
    @GET
    @Path("/loadJournal")
    public List<Dish> loadJournal() {
        return dishService.findAll();
    }


    /**
     * Метод по созданию нового блюда
     *
     * @param dish блюдо, которое стоит сохранить
     * @return список блюд с только что сохраненным
     */
    @POST
    @Path("/create")
    public List<Dish> create(Dish dish) {
        return dishService.save(dish);
    }


    /**
     * Метод по удалению блюда
     *
     * @param dish блюдо, которое стоит сохранить
     * @return список блюд с только что сохраненным
     */
    @POST
    @Path("/delete")
    public List<Dish> delete(Dish dish) {
        return dishService.delete(dish);
    }

    /**
     * Метод по обновлению нового блюда
     *
     * @param dish блюдо, которое стоит сохранить
     * @return список блюд с только что сохраненным
     */
    @POST
    @Path("/update")
    public List<Dish> update(Dish dish) {
        return dishService.update(dish);
    }

    @POST
    @Path("/addMaster")
    public List<Master> addMaster(Master master) {
        master.persist();
        return Master.listAll();
    }

    @POST
    @Path("/addDetailList")
    public List<Master> addDetailList(Set<Detail> detailList) {
//        Master m = createMaster;
//        Long masterId = m.masterId;
//        r.detailId = masterId;
//        r.createDate = new Date();//без времени
//        Set<Detail> details = r.detailSet;
//        for (InerDetail d: dList)
//        {
//            Detail det = createDetail;
//            det.detailId = masterId;
//            det.one = d.one;
//            det.two = d.two;
//            details.add(det);
//        }
//        m.commit();

        Master master = new Master();
        Master.persist(master);

        Random random = new Random();
        detailList.forEach(d -> {
            d.setId(master.getId());
            d.testOne = random.nextLong();
            d.testTwo = random.nextLong();
        });


        master.detailSet = detailList;
        Master.persist(master);
        return Master.listAll();
    }

}
