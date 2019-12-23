package greenfield.group.com.utils.querybuilder.impl.filter;


import greenfield.group.com.utils.querybuilder.builder.types.ValueCondition;
import lombok.Data;

/**
 * Объект фильтрации
 */
@Data
public class FilterRowItem {
    // Условие
    protected ValueCondition condition;
    // Поле для отображения на интерфейсе
    protected String headerName;
    // Поле для внутреннего маппинга
    protected String field;
    // Значение
    protected Object value;
}
