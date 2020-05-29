package greenfield.group.com.kitchenservice.services;

import greenfield.group.com.kitchenservice.model.Dish;

import javax.enterprise.context.ApplicationScoped;
import java.util.List;
import java.util.Optional;

/**
 * Сервис для работы с блюдом
 */
@ApplicationScoped
public class DishService {

    /**
     * Создание нового блюда
     *
     * @param dish объект нового блюда
     * @return полный список блюд
     */
    public List<Dish> save(Dish dish) {
        if (dish != null) {
            Dish.persist(dish);
        }
        return Dish.listAll();
    }

    /**
     * Обновление блюда
     *
     * @param dish объект нового блюда
     * @return полный список блюд
     */
    public List<Dish> update(Dish dish) {
        if (dish != null) {
            Long id = dish.getId();
            Optional<Dish> dishById = Dish.findByIdOptional(id);
            if (dishById.isPresent()) {
                Dish.persist(dish);
            }
        }
        return Dish.listAll();
    }

    /**
     * Удаление блюда
     *
     * @param dish объект нового блюда
     * @return полный список блюд
     */
    public List<Dish> delete(Dish dish) {
        if (dish != null) {
            Long id = dish.getId();
            Optional<Dish> dishById = Dish.findByIdOptional(id);
            if (dishById.isPresent()) {
                dish.delete();
            }
        }
        return Dish.listAll();
    }

    /**
     * Получение полного списка блюд
     *
     * @return полный список блюд
     */
    public List<Dish> findAll() {
        return Dish.listAll();
    }
}
