package greenfield.group.com.journalservice.repositories;


import api.exceptions.JournalRepositoryException;
import api.journal.JournalMetadata;

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
