package greenfield.group.com.gateway.gates.modeldto.auth;

import java.util.Set;

/**
 * Описание сущности адрес
 */
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

    public Address() {
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getRegionId() {
        return regionId;
    }

    public void setRegionId(String regionId) {
        this.regionId = regionId;
    }

    public String getDistrictId() {
        return districtId;
    }

    public void setDistrictId(String districtId) {
        this.districtId = districtId;
    }

    public String getCityId() {
        return cityId;
    }

    public void setCityId(String cityId) {
        this.cityId = cityId;
    }

    public String getStreetId() {
        return streetId;
    }

    public void setStreetId(String streetId) {
        this.streetId = streetId;
    }

    public String getBuildingId() {
        return buildingId;
    }

    public void setBuildingId(String buildingId) {
        this.buildingId = buildingId;
    }

    public String getQuery() {
        return query;
    }

    public void setQuery(String query) {
        this.query = query;
    }

    public String getContentType() {
        return contentType;
    }

    public void setContentType(String contentType) {
        this.contentType = contentType;
    }

    public Long getWithParent() {
        return withParent;
    }

    public void setWithParent(Long withParent) {
        this.withParent = withParent;
    }

    public String getLimit_property() {
        return limit_property;
    }

    public void setLimit_property(String limit_property) {
        this.limit_property = limit_property;
    }

    public String getOffset() {
        return offset;
    }

    public void setOffset(String offset) {
        this.offset = offset;
    }

    public Long getTypeCode() {
        return typeCode;
    }

    public void setTypeCode(Long typeCode) {
        this.typeCode = typeCode;
    }

    public String getZip() {
        return zip;
    }

    public void setZip(String zip) {
        this.zip = zip;
    }

    public Set<User> getUsers() {
        return users;
    }

    public void setUsers(Set<User> users) {
        this.users = users;
    }
}
