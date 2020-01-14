package greenfield.group.com.kitchenservice.model;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;
import java.util.Set;

/**
 * Сущность "заказ для кухни"
 */
@Data
@Entity
@Table(name = "k_order_ticket")
@EqualsAndHashCode(callSuper = true)
public class OrderTicket extends BaseEntity {
    // уникальный идентификатор заказа
    @Column(name = "orderid")
    private Long orderId;
    // список блюд, которые заказываются
    @ManyToMany(mappedBy = "orderTickets")
    private Set<Dish> dishDetails;
}
