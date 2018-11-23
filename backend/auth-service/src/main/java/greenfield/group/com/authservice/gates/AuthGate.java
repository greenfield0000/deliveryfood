package greenfield.group.com.authservice.gates;

import greenfield.group.com.authservice.entities.Account;
import greenfield.group.com.authservice.services.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import response.GateResponse;
import results.SimpleResult;


@RestController(value = "/auth")
public class AuthGate {

    @Autowired
    private AccountService accountService;

    @RequestMapping(path = "/login")
    public SimpleResult<Account> signIn(Account account) {
        return new GateResponse<>(accountService.signIn(account)).getResult();
    }

    @RequestMapping(path = "/logout")
    public SimpleResult<Account> signOut(Account account) {
        return new GateResponse<>(accountService.signOut(account)).getResult();
    }

    @RequestMapping(path = "/registry")
    public SimpleResult<Account> registry(Account account) {
        return new GateResponse<>(accountService.registry(account)).getResult();
    }

}
