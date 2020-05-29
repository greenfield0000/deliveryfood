package greenfield.group.com.kitchenservice.model;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
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
    public Long orderId;
    // список блюд, которые заказываются
    @ManyToMany(mappedBy = "orderTickets")
    public Set<Dish> dishDetails;
}
