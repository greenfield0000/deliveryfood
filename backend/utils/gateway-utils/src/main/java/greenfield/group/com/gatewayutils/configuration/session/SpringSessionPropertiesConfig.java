package greenfield.group.com.gatewayutils.configuration.session;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;

@Component
@PropertySource("gateway.properties")
@ConfigurationProperties("spring.greenfield.group.com.gatewayutils.session")
public class SpringSessionPropertiesConfig {

    private String storeType;
    private String timeout;
    private String flushMode;
    private String namespace;

    public SpringSessionPropertiesConfig() {
    }

    public SpringSessionPropertiesConfig(String storeType, String timeout, String flushMode, String namespace) {
        this.storeType = storeType;
        this.timeout = timeout;
        this.flushMode = flushMode;
        this.namespace = namespace;
    }

    public String getStoreType() {
        return storeType;
    }

    public void setStoreType(String storeType) {
        this.storeType = storeType;
    }

    public String getTimeout() {
        return timeout;
    }

    public void setTimeout(String timeout) {
        this.timeout = timeout;
    }

    public String getFlushMode() {
        return flushMode;
    }

    public void setFlushMode(String flushMode) {
        this.flushMode = flushMode;
    }

    public String getNamespace() {
        return namespace;
    }

    public void setNamespace(String namespace) {
        this.namespace = namespace;
    }

    @Override
    public String toString() {
        return "SpringSessionPropertiesConfig{" +
                "storeType='" + storeType + '\'' +
                ", timeout='" + timeout + '\'' +
                ", flushMode='" + flushMode + '\'' +
                ", namespace='" + namespace + '\'' +
                '}';
    }
}
