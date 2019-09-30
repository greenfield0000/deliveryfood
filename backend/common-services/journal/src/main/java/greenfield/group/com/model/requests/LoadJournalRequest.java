package greenfield.group.com.model.requests;

import lombok.Data;

@Data
public class LoadJournalRequest {
    // уникальный идентификатор аккаунта (фиктивный ключ, который дается при регистрации)
    private String uuid;
    // системное имя журнала
    private String sysName;
}
