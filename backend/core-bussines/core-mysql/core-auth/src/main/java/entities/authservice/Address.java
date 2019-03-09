package entities.authservice;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

/**
 * Описание сущности адрес
 */
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

    public Address() {
    }

    public Address(Long id, String token, String regionId, String districtId, String cityId, String streetId,
                   String buildingId, String query, String contentType, Long withParent, String limit_property,
                   String offset, Long typeCode, String zip) {
        this.id = id;
        this.token = token;
        this.regionId = regionId;
        this.districtId = districtId;
        this.cityId = cityId;
        this.streetId = streetId;
        this.buildingId = buildingId;
        this.query = query;
        this.contentType = contentType;
        this.withParent = withParent;
        this.limit_property = limit_property;
        this.offset = offset;
        this.typeCode = typeCode;
        this.zip = zip;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    @Override
    public String toString() {
        return "Address{" +
                "id=" + id +
                ", token='" + token + '\'' +
                ", regionId='" + regionId + '\'' +
                ", districtId='" + districtId + '\'' +
                ", cityId='" + cityId + '\'' +
                ", streetId='" + streetId + '\'' +
                ", buildingId='" + buildingId + '\'' +
                ", query='" + query + '\'' +
                ", contentType='" + contentType + '\'' +
                ", withParent=" + withParent +
                ", limit_property='" + limit_property + '\'' +
                ", offset='" + offset + '\'' +
                ", typeCode=" + typeCode +
                ", zip='" + zip + '\'' +
                '}';
    }
}
