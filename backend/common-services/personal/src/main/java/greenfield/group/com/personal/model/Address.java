package greenfield.group.com.personal.model;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * Описание сущности адрес
 */
@Data
@Entity
@Table(name = "ADDRESS")
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
}
