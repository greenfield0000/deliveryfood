package greenfield.group.com.authservice.gates;

import greenfield.group.com.authservice.entities.Account;
import greenfield.group.com.authservice.repositories.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController(value = "/auth")
public class AuthGate {

    @Autowired
    private AccountRepository accountRepository;

    @RequestMapping(method = RequestMethod.POST, path = "/login")
    public Account signIn(Account account) {
        Account account1 = new Account();
        account1.setAuthtorise(true);
        accountRepository.save(account1);
        return account1;
    }

    @RequestMapping(method = RequestMethod.POST, path = "/logout")
    public Account signOut(Account account) {
        Account account1 = new Account();
        account1.setAuthtorise(false);
        return account1;
    }

    @RequestMapping(method = RequestMethod.POST, path = "/registry")
    public Account registry() {
        return new Account();
    }

}
