package greenfield.group.com.gateway.gates;

import java.util.HashMap;
import java.util.Map;

/**
 * @author Ivanov Roman
 * @date 09.09.2019
 * @since 8
 **/
public abstract class Gate {

    /**
     * Временное решение хранения реестра сервисов
     */
    protected static final Map<String, String> serviceRegistry = new HashMap<>();

    protected static final String AUTH_SERVICE = "auth-service";
    private static final String AUTH_SERVICE_URL = "http://auth-service:8081/auth";

    protected static final String MENU_SERVICE = "menu-service";
    private static final String MENU_SERVICE_URL = "http://menu-service:8082/menu";

    protected static final String JOURNAL_SERVICE = "journal-service";
    private static final String JOURNAL_SERVICE_URL = "http://journal-service:8083/journal";

    protected static final String KLADR_SERVICE = "kladr-service";
    private static final String KLADR_SERVICE_URL = "http://kladr-service:8084/kladr";

    static {
        serviceRegistry.put(AUTH_SERVICE, AUTH_SERVICE_URL);
        serviceRegistry.put(MENU_SERVICE, MENU_SERVICE_URL);
        serviceRegistry.put(JOURNAL_SERVICE, JOURNAL_SERVICE_URL);
        serviceRegistry.put(KLADR_SERVICE, KLADR_SERVICE_URL);
    }
}
