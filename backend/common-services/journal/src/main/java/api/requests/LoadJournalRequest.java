package api.requests;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Getter
public class LoadJournalRequest {
    // уникальный идентификатор аккаунта (фиктивный ключ, который дается при регистрации)
    private String uuid;
    // системное имя журнала
    private String sysName;
}
