package exceptions;


/**
 * Исключение, которое бросается в случае, если нащши данные
 * не верные (например должен быть 1 id, а пришло несколько)
 */
public class DataBaseDataException extends Exception {
    public DataBaseDataException(String message) {
        super(message);
    }
}
