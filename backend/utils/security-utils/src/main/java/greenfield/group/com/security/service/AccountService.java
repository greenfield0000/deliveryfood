package greenfield.group.com.security.service;

import greenfield.group.com.personal.model.Account;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Service interface for class {@link Account}.
 *
 * @author Ivanov Roman
 * @version 1.0
 */
@Service
public interface AccountService {

    Account register(Account account);

    List<Account> getAll();

    Account findByLogin(String login);

    Account findById(Long id);

    void delete(Long id);
}
