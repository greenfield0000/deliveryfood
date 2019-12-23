package greenfield.group.com.utils.querybuilder.builder.exception;

/**
 * Все исключения, связанные с построением запросов для Mysql
 */
public class MySqlBuilderException extends Exception {
    public MySqlBuilderException(String message) {
        super(message);
    }
}
