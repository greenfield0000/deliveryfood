package greenfield.group.com.personal.model.exceptions;


/**
 * Любое исключение, связанное с репозиторием
 */
public class JournalRepositoryException extends Exception {
    public JournalRepositoryException(String message) {
        super(message);
    }
}
