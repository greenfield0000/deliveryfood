package greenfield.group.com.journalservice.repositories;


import greenfield.group.com.personal.model.exceptions.JournalRepositoryException;
import greenfield.group.com.personal.model.journal.JournalMetadata;

/**
 * Описание crud операций для работы с журналом
 */
public interface JournalRepository {

    /**
     * Загрузка метаинформации журнала
     *
     * @param journalSysName системное имя журнала
     * @return объект журнала
     */
    JournalMetadata load(String journalSysName) throws JournalRepositoryException, JournalRepositoryException;

}
