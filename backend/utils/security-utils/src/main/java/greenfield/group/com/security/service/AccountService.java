package greenfield.group.com.security.service;

import api.Account;

import java.util.List;

/**
 * Service interface for class {@link Account}.
 *
 * @author Ivanov Roman
 * @version 1.0
 */

public interface AccountService {

    Account register(Account account);

    List<Account> getAll();

    Account findByLogin(String login);

    Account findById(Long id);

    void delete(Long id);
}