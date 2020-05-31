package greenfield.group.com.gateway.gates.modeldto.kladr.context;

/**
 * Класс контекста поиска. Хранит основную информацию для запроса
 *
 * @author Ivanov Roman
 * @date 27.06.19
 * @since 8
 **/
public class RequestContext {

    private final String url = "https://kladr-greenfield.group.com.model.ru/greenfield.group.com.model.php?";

    // Тип возвращаемых объектов (region, district, city, street, building)
    private ContentType contentType;

    // Количество возвращаемых объектов
    private int limit = 7;

    // Строка для поиска по названию
    private String query;

    // Если 1, сервис вернёт объекты вместе с родительскими
    // (для района это регион, для населённого пункта район и регион и т.п.)
    private String withParent = "1";

    private String cityId;
    private String streetId;

    public RequestContext(RequestContext context) {
        if (context != null) {
            this.contentType = context.getContentType();
            this.query = context.getQuery();
            this.cityId = context.getCityId();
            this.streetId = context.getStreetId();
        }
    }

    public String getStreetId() {
        return streetId;
    }

    public void setStreetId(String streetId) {
        this.streetId = streetId;
    }

    public String getUrl() {
        return url;
    }

    public ContentType getContentType() {
        return contentType;
    }

    public void setContentType(ContentType contentType) {
        this.contentType = contentType;
    }

    public int getLimit() {
        return limit;
    }

    public void setLimit(int limit) {
        this.limit = limit;
    }

    public String getQuery() {
        return query;
    }

    public void setQuery(String query) {
        this.query = query;
    }

    public String getWithParent() {
        return withParent;
    }

    public void setWithParent(String withParent) {
        this.withParent = withParent;
    }

    public String getCityId() {
        return cityId;
    }

    public void setCityId(String cityId) {
        this.cityId = cityId;
    }

    @Override
    public String toString() {
        return url + (!query.isEmpty() ? "&query=" + query : "")
                + (contentType != null ? "&contentType=" + contentType : "")
                + (cityId != null ? "&cityId=" + cityId : "")
                + (streetId != null ? "&streetId=" + streetId : "")
                + "&limit=" + limit
                + "&withParent=" + withParent;
    }
}
