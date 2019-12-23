package greenfield.group.com.authservice.gates;

import greenfield.group.com.authservice.dto.response.LoginAccountResponseDTO;
import greenfield.group.com.authservice.model.Account;
import greenfield.group.com.authservice.services.AuthService;
import greenfield.group.com.gatecommon.SimpleResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController(value = "/auth")
public class AuthGate {

    @Autowired
    private AuthService authService;

    //    @CrossOrigin(origins = "http://localhost:4200/**")
    @RequestMapping(path = "/login", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public SimpleResult<LoginAccountResponseDTO> login(@RequestBody Account account) {
        return authService.signIn(account);
    }

    //    @CrossOrigin(origins = "http://localhost:4200/**")
    @RequestMapping(path = "/logout", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public SimpleResult<Account> logout(@RequestBody Account account) {
        return authService.signOut(account);
    }

    //    @CrossOrigin(origins = "http://localhost:4200/**")
    @RequestMapping(path = "/registry", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public SimpleResult<Account> registry(@RequestBody Account account) {
        return authService.registry(account);
    }

}
