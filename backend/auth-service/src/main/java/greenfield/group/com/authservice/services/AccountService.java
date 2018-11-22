package greenfield.group.com.authservice.services;

import greenfield.group.com.authservice.entities.Account;
import greenfield.group.com.authservice.repositories.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Optional;

/**
 * Сервис по работе с аккаунтом
 */
@Service
public class AccountService {

    @Autowired
    private RestTemplate restTemplate;
    @Autowired
    private AccountRepository accountRepository;

    public Account signIn(Account account) {
        return setAthtorizeFlagAndSave(account, true);
    }

    public Account signOut(Account account) {
        return setAthtorizeFlagAndSave(account, false);
    }

    public Account registry(Account account) {
        // some bussines logic
        return new Account();
    }

    /**
     * Temp function
     *
     * @return
     */
    public Account greeting() {
        Account account = new Account();
        account.setAuthtorise(true);
        account.setLogin("123");
        account.setPassword("123");
        return account;
    }


    private Account setAthtorizeFlagAndSave(Account account, boolean isAuth) {
        Optional<Account> finderAccount = accountRepository
                .findByLoginAndPassword(account.getLogin(), account.getPassword());

        if (!finderAccount.isPresent()) {
            finderAccount = Optional.of(new Account(account.getLogin(), account.getPassword()));
        }

        finderAccount.get().setAuthtorise(isAuth);
        return accountRepository.save(finderAccount.get());
    }
}
