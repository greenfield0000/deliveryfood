package greenfield.group.com.authservice.gates;

import greenfield.group.com.authservice.entities.Account;
import greenfield.group.com.authservice.services.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import response.GateResponse;
import results.SimpleResult;

@CrossOrigin
@RestController(value = "/auth")
public class AuthGate {

    @Autowired
    private AccountService accountService;
    @Autowired
    private RestTemplate restTemplate;

    @RequestMapping(path = "/login", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public SimpleResult<Account> login(@RequestBody Account account) {
        return new GateResponse<>(accountService.signIn(account)).getResult();
    }

    @RequestMapping(path = "/logout")
    public SimpleResult<Account> logout(@RequestBody Account account) {
        return new GateResponse<>(accountService.signOut(account)).getResult();
    }

    @RequestMapping(path = "/registry")
    public SimpleResult<Account> registry(@RequestBody Account account) {
        return new GateResponse<>(accountService.registry(account)).getResult();
    }

}
