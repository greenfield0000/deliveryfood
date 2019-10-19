package greenfield.group.com.journalservice.repositories;


import greenfield.group.com.journalservice.exceptions.JournalRepositoryException;
import greenfield.group.com.journalservice.journal.JournalMetadata;

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
    JournalMetadata metaDataLoad(String journalSysName) throws JournalRepositoryException;

}
