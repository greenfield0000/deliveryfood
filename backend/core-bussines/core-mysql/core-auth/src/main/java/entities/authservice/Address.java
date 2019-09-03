package entities.authservice;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import entities.journal.personal.Organization;
import lombok.*;

import javax.persistence.*;

/**
 * Описание сущности адрес
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "Address")
@JsonIgnoreProperties(ignoreUnknown = true)
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String token;
    private String regionId;
    private String districtId;
    private String cityId;
    private String streetId;
    private String buildingId;
    private String query;
    private String contentType;
    private Long withParent;
    private String limit_property;
    private String offset;
    private Long typeCode;
    private String zip;
    @OneToOne(mappedBy = "address")
    private Organization organization;
}
