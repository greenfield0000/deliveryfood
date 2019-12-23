package greenfield.group.com.authservice.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import javax.persistence.*;
import java.sql.Date;

@Data
@MappedSuperclass
@JsonIgnoreProperties(ignoreUnknown = true)
public class BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected Long id;

    @Column(name = "created")
    protected Date created;

    @Column(name = "updated")
    protected Date updated;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    protected Status status;

    @Column(name = "uuid")
    protected String uuid;
}

