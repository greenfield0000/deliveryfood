package greenfield.group.com.journalservice.requests;

import lombok.Data;

/**
 * Обработка кнопки
 *
 * @author Ivanov Roman
 * @date 09.11.2019
 * @since 8
 **/
@Data
public class ButtonHandlerRequest {
    private String journalSysName;
    private String buttonAction;
    private int pageNumber;
}
