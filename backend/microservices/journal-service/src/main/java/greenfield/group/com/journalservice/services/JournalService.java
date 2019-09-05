package greenfield.group.com.journalservice.services;


import api.exceptions.JournalRepositoryException;
import api.journal.JournalMetadata;
import greenfield.group.com.journalservice.repositories.impl.JournalRepositoryIml;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Апи для работы с журналом
 */
@Service
public class JournalService {

    @Autowired
    private JournalRepositoryIml journalRepositoryIml;

    /**
     * Загрузка журнала согласно параметрам
     *
     * @param sysName системное имя журнала
     * @param uuid    уникальный идентификатор учетной записи
     * @return
     */
    public JournalMetadata loadJournal(String sysName, String uuid) {
        JournalMetadata journalMetadata = new JournalMetadata();
        try {
             journalMetadata = journalRepositoryIml.load(sysName);
        } catch (JournalRepositoryException e) {
            e.printStackTrace();
        }
        return journalMetadata;
    }
}
