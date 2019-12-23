package greenfield.group.com.utils.querybuilder.builder.unit;

import greenfield.group.com.utils.querybuilder.builder.types.ValueCondition;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class Statement {
    // Имя поля
    private String fieldName;
    // Условие
    private ValueCondition condition;
    // Значение
    private Object value;
}
