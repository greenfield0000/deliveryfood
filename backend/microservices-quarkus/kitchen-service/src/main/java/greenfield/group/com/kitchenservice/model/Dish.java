package greenfield.group.com.kitchenservice.model;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;
import java.util.Set;

/**
 * Модель "блюдо"
 */
@Data
@Entity
@Table(name = "k_dish")
@EqualsAndHashCode(callSuper = true)
public class Dish extends BaseEntity {
    // ингридиенты блюда
    @ManyToMany
    @JoinTable(
            name = "k_dish_ingredient",
            joinColumns = @JoinColumn(name = "dishid"),
            inverseJoinColumns = @JoinColumn(name = "ingridientid"))
    public Set<IngredientDetail> ingredientDetails;
    // список заказов
    @ManyToMany
    @JoinTable(name = "k_order_ticket_dish",
            joinColumns = @JoinColumn(name = "dishid"),
            inverseJoinColumns = @JoinColumn(name = "orderticketid"))
    public Set<OrderTicket> orderTickets;
    // стоимость блюда
    @Column(name = "cost")
    public Double cost;
    // картинка блюда
    @Column(name = "picture")
    public String picture;
    // вес порции
    @Column(name = "weight")
    public int weight;
}


