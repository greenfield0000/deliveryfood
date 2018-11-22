package greenfield.group.com.authservice.gates;

import greenfield.group.com.authservice.entities.Account;
import greenfield.group.com.authservice.services.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController(value = "/auth")
public class AuthGate {

    @Autowired
    private AccountService accountService;

    @RequestMapping(path = "/login")
    public Account signIn(Account account) {
        return accountService.signIn(account);
    }

    @RequestMapping(path = "/logout")
    public Account signOut(Account account) {
        return accountService.signOut(account);
    }

    @RequestMapping(path = "/registry")
    public Account registry(Account account) {
        return accountService.registry(account);
    }

    @RequestMapping(path = "/greeting")
    public Account greeting() {
        Account account = new Account();
        account.setAuthtorise(true);
        account.setLogin("123");
        account.setPassword("123");
        return account;
    }

}
