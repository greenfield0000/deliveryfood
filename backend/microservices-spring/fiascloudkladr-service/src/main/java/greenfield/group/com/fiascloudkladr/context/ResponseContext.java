package greenfield.group.com.fiascloudkladr.context;

import greenfield.group.com.fiascloudkladr.types.ContentType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * Ответ сервиса кладр
 *
 * @author Ivanov Roman
 * @date 27.06.19
 * @since 8
 **/
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResponseContext {

    private String cadnum;
    private ContentType contentType;
    private String guid;
    private String id;
    private String ifnsfl;
    private String ifnsul;
    private String name;
    private String okato;
    private String oktmo;
    private String parentGuid;
    private String type;
    private String typeShort;
    private long zip;
    private List<ResponseContext> parents;

    public String getCadnum() {
        return cadnum;
    }

    public void setCadnum(String cadnum) {
        this.cadnum = cadnum;
    }

    public ContentType getContentType() {
        return contentType;
    }

    public void setContentType(ContentType contentType) {
        this.contentType = contentType;
    }

    public String getGuid() {
        return guid;
    }

    public void setGuid(String guid) {
        this.guid = guid;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getIfnsfl() {
        return ifnsfl;
    }

    public void setIfnsfl(String ifnsfl) {
        this.ifnsfl = ifnsfl;
    }

    public String getIfnsul() {
        return ifnsul;
    }

    public void setIfnsul(String ifnsul) {
        this.ifnsul = ifnsul;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getOkato() {
        return okato;
    }

    public void setOkato(String okato) {
        this.okato = okato;
    }

    public String getOktmo() {
        return oktmo;
    }

    public void setOktmo(String oktmo) {
        this.oktmo = oktmo;
    }

    public String getParentGuid() {
        return parentGuid;
    }

    public void setParentGuid(String parentGuid) {
        this.parentGuid = parentGuid;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getTypeShort() {
        return typeShort;
    }

    public void setTypeShort(String typeShort) {
        this.typeShort = typeShort;
    }

    public long getZip() {
        return zip;
    }

    public void setZip(long zip) {
        this.zip = zip;
    }

    public List<ResponseContext> getParents() {
        return parents;
    }

    public void setParents(List<ResponseContext> parents) {
        this.parents = parents;
    }
}
