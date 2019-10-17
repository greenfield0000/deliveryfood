package greenfield.group.com.security.service.impl;

import greenfield.group.com.personal.model.Account;
import greenfield.group.com.personal.model.Role;
import greenfield.group.com.personal.model.Status;
import greenfield.group.com.security.repository.AccountRepository;
import greenfield.group.com.security.service.AccountService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * Implementation of {@link AccountService} interface.
 * Wrapper for {@link AccountRepository} + business logic.
 *
 * @author Ivanov Roman
 * @version 1.0
 */

@Slf4j
@Service
public class AccountServiceImpl implements AccountService {

    @Autowired
    private  BCryptPasswordEncoder passwordEncoder;
    @Autowired
    private  AccountRepository accountRepository;


    @Override
    public Account register(Account account) {
        Role roleAccount = new Role();
        roleAccount.setName("Пользователь");
        roleAccount.setSysname("ROLE_USER");
        List<Role> accountRoles = new ArrayList<>();
        accountRoles.add(roleAccount);

        account.setPassword(passwordEncoder.encode(account.getPassword()));
        account.setStatus(Status.ACTIVE);

        Account registeredAccount = accountRepository.save(account);

        log.info("IN register - Account: {} successfully registered", registeredAccount);

        return registeredAccount;
    }

    @Override
    public List<Account> getAll() {
        List<Account> result = accountRepository.findAll();
        log.info("IN getAll - {} Accounts found", result.size());
        return result;
    }

    @Override
    public Account findByLogin(String nickName) {
        Account result = accountRepository.findByNickName(nickName);
        log.info("IN findByLogin - Account: {} found by Accountname: {}", result, nickName);
        return result;
    }

    @Override
    public Account findById(Long id) {
        Account result = accountRepository.findById(id).orElse(null);

        if (result == null) {
            log.warn("IN findById - no Account found by id: {}", id);
            return null;
        }

        log.info("IN findById - Account: {} found by id: {}", result);
        return result;
    }

    @Override
    public void delete(Long id) {
        accountRepository.deleteById(id);
        log.info("IN delete - Account with id: {} successfully deleted");
    }
}
