package greenfield.group.com.journalservice.repositories;

import greenfield.group.com.journalservice.exceptions.JournalRepositoryException;
import greenfield.group.com.journalservice.repositories.model.Journal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository interface that extends {@link JpaRepository} for class {@link Journal}.
 *
 * @author Ivanov Roman
 * @version 1.0
 */

@Repository
public interface JournalRepository extends JpaRepository<Journal, Long> {

    /**
     * Загрузка метаинформации журнала
     *
     * @param journalSysName системное имя журнала
     * @return объект журнала
     */
    Journal findJournalBySysName(String journalSysName) throws JournalRepositoryException;

}