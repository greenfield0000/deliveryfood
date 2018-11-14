package greenfield.group.com.authservice.repositories;

import greenfield.group.com.authservice.entities.Account;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public
interface AccountRepository extends CrudRepository<Account, Long> {
}
