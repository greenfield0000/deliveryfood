package greenfield.group.com.authservice.gates;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import entities.authservice.Account;
import entities.authservice.Role;
import greenfield.group.com.authservice.services.AccountService;
import greenfield.group.com.gatewayutils.response.GateResponse;
import greenfield.group.com.gatewayutils.results.SimpleResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:4200/**")
@RestController(value = "/auth")
public class AuthGate {

    @Autowired
    private AccountService accountService;
    @Autowired
    private RestTemplate restTemplate;
    @Autowired
    private ObjectMapper objectMapper;

    @RequestMapping(path = "/login", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public SimpleResult<Account> login(@RequestBody Account account) {
        return accountService.signIn(account);
    }

    @RequestMapping(path = "/logout", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public SimpleResult<Account> logout(@RequestBody Account account) {
        return accountService.signOut(account);
    }

    @RequestMapping(path = "/registry", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public SimpleResult<Account> registry(@RequestBody Account account) {
        return accountService.registry(account);
    }

    @RequestMapping(path = "/getAccountRoleSysNameByUUID", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public Role getAccountRoleSysNameByUUID(@RequestBody String jsonUuid) {
        Role role = new Role();
        try {
            Map<String, Object> mappedvalues = objectMapper.readValue(jsonUuid, new TypeReference<Map<String, Object>>() {
            });
            if ((mappedvalues != null) && (mappedvalues.get("uuid") != null)) {
                String uuid = mappedvalues.get("uuid").toString();
                return accountService.getAccountRoleSysNameByUUID(uuid);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return role;
    }
}
