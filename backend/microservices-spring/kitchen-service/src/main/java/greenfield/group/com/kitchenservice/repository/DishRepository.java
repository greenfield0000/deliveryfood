package greenfield.group.com.kitchenservice.repository;

import greenfield.group.com.kitchenservice.model.Dish;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Репозиторий для поиска "Блюдо"
 */
@Repository
public interface DishRepository extends JpaRepository<Dish, Long> {
}
