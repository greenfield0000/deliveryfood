package api;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.OneToOne;
import javax.persistence.Table;

/**
 * Описание сущности адрес
 */
@Data
@Entity
@Table(name = "Address")
public class Address extends BaseEntity {
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
