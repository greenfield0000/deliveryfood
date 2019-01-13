package greenfield.group.com.authservice.repositories;

import entities.authservice.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {

    Optional<Account> findByLoginAndPassword(String login, String password);

    Optional<Account> findByLogin(String login);

    Optional<Account> findByUuid(String uuid);
}
