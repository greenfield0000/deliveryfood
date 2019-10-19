package greenfield.group.com.authservice.security.repository;

import greenfield.group.com.authservice.model.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Repository interface that extends {@link JpaRepository} for class {@link Account}.
 *
 * @author Ivanov Roman
 * @version 1.0
 */

@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {

    Account findByNickName(String name);

    Optional<Account> findByLoginAndPassword(String login, String password);

    Optional<Account> findByLogin(String login);

    Optional<Account> findByUuid(String uuid);
}
