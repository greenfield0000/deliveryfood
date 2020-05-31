package greenfield.group.com.authservice.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import java.util.Set;

/**
 * Описание сущности адрес
 */
@Entity
@Table(name = "b_address")
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
    @Column(name = "addres_offset")
    private String offset;
    private Long typeCode;
    private String zip;
    @ManyToMany(mappedBy = "addresses")
    private Set<User> users;

    public Address() {
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
