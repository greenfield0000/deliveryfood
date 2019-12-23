package greenfield.group.com.utils.querybuilder.builder.types;

/**
 * Способы соединения выражений-ограничений для построения запроса
 */
public enum StatementCondition {
    // Логическое "И"
    AND(" AND "),
    // Логическое "ИЛИ"
    OR(" OR ");

    // Основной оператор
    private final String operator;

    StatementCondition(String operator) {
        this.operator = operator;
    }

    public String getOperator() {
        return this.operator;
    }
}
