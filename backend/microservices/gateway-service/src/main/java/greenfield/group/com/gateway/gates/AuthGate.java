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
@RestController
public class AuthGate {

    @Autowired
    private RestTemplate restTemplate;

    @RequestMapping(path = "/auth-gate/login", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public SimpleResult<Account> login(@RequestBody Account account) {
        return new SimpleResult<>(Status.OK, "OK", null);
    }

    @RequestMapping(path = "/auth-gate/logout", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public SimpleResult<Account> logout(@RequestBody Account account) {
        return new SimpleResult<>(Status.OK, "OK", null);
    }

    @RequestMapping(path = "/auth-gate/registry", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public SimpleResult<Account> registry(@RequestBody Account account) {
        return new SimpleResult<>(Status.OK, "OK", null);
    }

    /**
     * Метод получает список ролей у аккаунта
     *
     * @param uuid уникальный идентификатор аккаунта
     * @return
     */
    @RequestMapping(path = "/auth-gate/getAccountRoleSysNameByUUID", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public Role getAccountRoleSysNameByUUID(@RequestBody String uuid) {
        return null;
    }
}