package greenfield.group.com.utils.querybuilder.part.impl.filter;


import greenfield.group.com.utils.querybuilder.types.Condition;
import lombok.Data;

/**
 * Объект фильтрации
 */
@Data
public class FilterRowItem {
    // Условие
    protected Condition condition;
    // Поле для отображения на интерфейсе
    protected String headerName;
    // Поле для внутреннего маппинга
    protected String field;
    // Значение
    protected Object value;
}
