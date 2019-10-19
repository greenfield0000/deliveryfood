package greenfield.group.com.authservice.security.service;

import greenfield.group.com.authservice.model.Account;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Service interface for class {@link Account}.
 *
 * @author Ivanov Roman
 * @version 1.0
 */
@Service
public interface AccountServiceAAA {

    Account register(Account account);

    List<Account> getAll();

    Account findByLogin(String login);

    Account findById(Long id);

    void delete(Long id);
}
