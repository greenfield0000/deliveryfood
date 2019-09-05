package greenfield.group.com.authservice.gates;

import api.Account;
import api.Role;
import greenfield.group.com.authservice.services.AccountService;
import greenfield.group.com.gatewayutils.results.SimpleResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@RestController(value = "/auth")
public class AuthGate {

    @Autowired
    private AccountService accountService;
    @Autowired
    private RestTemplate restTemplate;

    @CrossOrigin(origins = "http://localhost:4200/**")
    @RequestMapping(path = "/login", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public SimpleResult<Account> login(@RequestBody Account account) {
        return accountService.signIn(account);
    }

    @CrossOrigin(origins = "http://localhost:4200/**")
    @RequestMapping(path = "/logout", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public SimpleResult<Account> logout(@RequestBody Account account) {
        return accountService.signOut(account);
    }

    @CrossOrigin(origins = "http://localhost:4200/**")
    @RequestMapping(path = "/registry", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public SimpleResult<Account> registry(@RequestBody Account account) {
        return accountService.registry(account);
    }

    /**
     * Метод получает список ролей у аккаунта
     *
     * @param uuid уникальный идентификатор аккаунта
     * @return
     */
    @RequestMapping(path = "/getAccountRoleSysNameByUUID", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public Role getAccountRoleSysNameByUUID(@RequestBody String uuid) {
        return accountService.getAccountRoleSysNameByUUID(uuid);
    }
}
