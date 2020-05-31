package greenfield.group.com.gateway.gates.modeldto.journal;


public class LoadJournalRequest {
    // уникальный идентификатор аккаунта (фиктивный ключ, который дается при регистрации)
    private String uuid;
    // системное имя журнала
    private String sysName;

    public LoadJournalRequest() {
    }

    public String getUuid() {
        return uuid;
    }

    public void setUuid(String uuid) {
        this.uuid = uuid;
    }

    public String getSysName() {
        return sysName;
    }

    public void setSysName(String sysName) {
        this.sysName = sysName;
    }
}
