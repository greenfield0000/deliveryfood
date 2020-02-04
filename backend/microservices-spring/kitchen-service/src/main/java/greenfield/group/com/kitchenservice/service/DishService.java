package greenfield.group.com.kitchenservice.service;

import greenfield.group.com.kitchenservice.model.Dish;
import greenfield.group.com.kitchenservice.repository.DishRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * Сервис для работы с блюдом
 */
@Service
public class DishService {

    @Autowired
    private DishRepository dishRepository;

    /**
     * Создание нового блюда
     *
     * @param dish объект нового блюда
     * @return полный список блюд
     */
    public List<Dish> save(Dish dish) {
        if (dish != null) {
            dishRepository.save(dish);
        }
        return dishRepository.findAll();
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
            Optional<Dish> dishById = dishRepository.findById(id);
            if (dishById.isPresent()) {
                dishRepository.save(dish);
            }
        }
        return dishRepository.findAll();
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
            Optional<Dish> dishById = dishRepository.findById(id);
            if (dishById.isPresent()) {
                dishRepository.delete(dish);
            }
        }
        return dishRepository.findAll();
    }

    /**
     * Получение полного списка блюд
     *
     * @return полный список блюд
     */
    public List<Dish> findAll() {
        return dishRepository.findAll();
    }
}
