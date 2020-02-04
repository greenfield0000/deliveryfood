package greenfield.group.com.kitchenservice;

import greenfield.group.com.kitchenservice.model.Dish;
import greenfield.group.com.kitchenservice.service.DishService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.List;

@RequestMapping("/kitchen")
public class Gate {

    @Autowired
    private DishService dishService;


    /**
     * Журнальный метод для загрузки данных журнала "Персонал"
     *
     * @return список ползователей системы
     */
    @RequestMapping(path = "/loadJournal", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Dish> loadJournal() {
        return dishService.findAll();
    }


    /**
     * Метод по созданию нового блюда
     *
     * @param dish блюдо, которое стоит сохранить
     * @return список блюд с только что сохраненным
     */
    @RequestMapping(path = "/create", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Dish> create(Dish dish) {
        return dishService.save(dish);
    }


    /**
     * Метод по удалению блюда
     *
     * @param dish блюдо, которое стоит сохранить
     * @return список блюд с только что сохраненным
     */
    @RequestMapping(path = "/delete", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Dish> delete(Dish dish) {
        return dishService.delete(dish);
    }

    /**
     * Метод по обновлению нового блюда
     *
     * @param dish блюдо, которое стоит сохранить
     * @return список блюд с только что сохраненным
     */
    @RequestMapping(path = "/update", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Dish> update(Dish dish) {
        return dishService.update(dish);
    }

}
