package greenfield.group.com.journalservice.exceptions;


/**
 * Любое исключение, связанное с репозиторием
 */
public class JournalRepositoryException extends Exception {
    public JournalRepositoryException(String message) {
        super(message);
    }
}
