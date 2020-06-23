package greenfield.group.com.journalservice.repositories;

import greenfield.group.com.menuservice.repository.model.Journal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository interface that extends {@link JpaRepository} for class {@link Account}.
 *
 * @author Ivanov Roman
 * @version 1.0
 */

@Repository
public interface JournalRepository extends JpaRepository<Journal, Long> {

//    Account findByNickName(String name);
//
//    Optional<Account> findByLoginAndPassword(String login, String password);
//
//    Optional<Account> findByLogin(String login);
//
//    Optional<Account> findByUuid(String uuid);
}