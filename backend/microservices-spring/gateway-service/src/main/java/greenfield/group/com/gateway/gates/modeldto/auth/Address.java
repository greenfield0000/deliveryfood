package greenfield.group.com.gateway.gates.modeldto.auth;

import lombok.Data;

import java.util.Set;

/**
 * Описание сущности адрес
 */
@Data
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
    private Set<User> users;
}
