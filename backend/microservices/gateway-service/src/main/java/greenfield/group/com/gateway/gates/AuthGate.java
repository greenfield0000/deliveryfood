package greenfield.group.com.gateway.gates;

import api.Account;
import api.Role;
import greenfield.group.com.gatewayutils.enums.Status;
import greenfield.group.com.gatewayutils.results.SimpleResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@CrossOrigin(origins = "http://localhost:4200/**")
@RestController(value = "/auth-gate")
public class AuthGate {

    @Autowired
    private RestTemplate restTemplate;

    @RequestMapping(path = "/login", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public SimpleResult<Account> login(@RequestBody Account account) {
        return new SimpleResult<>(Status.OK, "OK", null);
    }

    @RequestMapping(path = "/logout", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public SimpleResult<Account> logout(@RequestBody Account account) {
        return new SimpleResult<>(Status.OK, "OK", null);
    }

    @RequestMapping(path = "/registry", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public SimpleResult<Account> registry(@RequestBody Account account) {
        return new SimpleResult<>(Status.OK, "OK", null);
    }

    /**
     * Метод получает список ролей у аккаунта
     *
     * @param uuid уникальный идентификатор аккаунта
     * @return
     */
    @RequestMapping(path = "/getAccountRoleSysNameByUUID", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public Role getAccountRoleSysNameByUUID(@RequestBody String uuid) {
        return null;
    }
}