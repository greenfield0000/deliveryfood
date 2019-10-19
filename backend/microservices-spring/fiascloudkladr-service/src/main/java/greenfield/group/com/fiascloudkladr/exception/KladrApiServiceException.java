package greenfield.group.com.fiascloudkladr.exception;

/**
 * Исключение, которое будет бросаться в контексте построения url для запроса
 *
 * @author Ivanov Roman
 * @date 27.06.19
 * @since 8
 **/
public class KladrApiServiceException extends Exception {

    public KladrApiServiceException(String message) {
        super(message);
    }
}
