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

    protected static final String AUTH_SERVICE = "auth-gate";
    protected static final String MENU_SERVICE = "menu-gate";
    protected static final String JOURNAL_SERVICE = "journal-gate";
    protected static final String KLADR_SERVICE = "kladr-gate";
//    private static final String AUTH_SERVICE_URL = "http://auth-service:8081/auth";
//    private static final String MENU_SERVICE_URL = "http://menu-service:8082/menu";
//    private static final String JOURNAL_SERVICE_URL = "http://journal-service:8083/journal";
//    private static final String KLADR_SERVICE_URL = "http://kladr-service:8084/kladr";
    private static final String AUTH_SERVICE_URL =      "http://0.0.0.0:8081/auth";
    private static final String MENU_SERVICE_URL =      "http://0.0.0.0:8082/menu";
    private static final String JOURNAL_SERVICE_URL =   "http://0.0.0.0:8083/journal";
    private static final String KLADR_SERVICE_URL =     "http://0.0.0.0:8084/kladr";

    static {
        serviceRegistry.put(AUTH_SERVICE, AUTH_SERVICE_URL);
        serviceRegistry.put(MENU_SERVICE, MENU_SERVICE_URL);
        serviceRegistry.put(JOURNAL_SERVICE, JOURNAL_SERVICE_URL);
        serviceRegistry.put(KLADR_SERVICE, KLADR_SERVICE_URL);
    }
}
