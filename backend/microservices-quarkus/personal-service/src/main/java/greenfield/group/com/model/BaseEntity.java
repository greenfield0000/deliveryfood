package greenfield.group.com.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.util.Date;
import java.util.UUID;

@Data
@MappedSuperclass
@JsonIgnoreProperties(ignoreUnknown = true)
public class BaseEntity {

    @Id
    @SequenceGenerator(name = "hibernateSeq", sequenceName = "HIBERNATE_SEQUENCE", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "hibernateSeq")
    protected Long id;

    @Column(name = "created")
    @Temporal(TemporalType.TIMESTAMP)
    @CreationTimestamp
    protected Date created = new Date();

    @Column(name = "updated")
    @Temporal(TemporalType.TIMESTAMP)
    @UpdateTimestamp
    protected Date updated = new Date();

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    protected Status status;

    @Column(name = "uuid")
    protected String uuid = UUID.randomUUID().toString();
}

