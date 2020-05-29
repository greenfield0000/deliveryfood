package greenfield.group.com.kitchenservice.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.util.Date;
import java.util.UUID;

/**
 * Базова сущность
 */
@Data
@MappedSuperclass
@JsonIgnoreProperties(ignoreUnknown = true)
public class BaseEntity extends PanacheEntityBase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected Long id;

    @Column(name = "created", updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    @CreationTimestamp
    protected Date created = new Date();

    @Column(name = "updated")
    @Temporal(TemporalType.TIMESTAMP)
    @UpdateTimestamp
    protected Date updated = new Date();

    @Column(name = "status")
    protected String status;

    @Column(name = "uuid", updatable = false)
    protected String uuid = UUID.randomUUID().toString();
}