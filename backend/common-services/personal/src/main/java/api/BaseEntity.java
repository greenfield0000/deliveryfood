package api;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;

@Data
@MappedSuperclass
@JsonIgnoreProperties(ignoreUnknown = true)
public class BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
//
//    @Column(name = "created")
//    private Date created;
//
//    @Column(name = "updated")
//    private Date updated;
//
//    @Enumerated(EnumType.STRING)
//    @Column(name = "status")
//    private Status status;
}
