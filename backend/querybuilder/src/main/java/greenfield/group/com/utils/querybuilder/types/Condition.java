package greenfield.group.com.utils.querybuilder.types;

/**
 * Основные сравнения значений, которые поддерживает фильтрация
 */
public enum Condition {
    // Равно
    EQUALS("="),
    // Не равно
    NOT_EQUAL("<>"),
    // Строго меньще, чем
    LESS_THAN("<"),
    // Меньше или равно, чем
    LESS_THAN_OR_EQUAL("<="),
    // Больше, чем
    GREATER_THAN(">"),
    // Больше или равно, чем
    GREATER_THAN_OR_EQUAL(">=");

    // Основной оператор
    private final String operator;

    Condition(String operator) {
        this.operator = operator;
    }

    public String getOperator() {
        return this.operator;
    }
}
