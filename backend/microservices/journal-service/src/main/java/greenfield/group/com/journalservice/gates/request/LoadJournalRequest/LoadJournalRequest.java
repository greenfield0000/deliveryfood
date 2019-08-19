package greenfield.group.com.journalservice.gates.request.LoadJournalRequest;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@NoArgsConstructor
@Getter
@Setter
public class LoadJournalRequest {
    // уникальный идентификатор аккаунта (фиктивный ключ, который дается при регистрации)
    private String uuid;
    // системное имя журнала
    private String sysName;
}
