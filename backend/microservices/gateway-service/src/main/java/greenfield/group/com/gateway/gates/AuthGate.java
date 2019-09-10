package greenfield.group.com.gateway.gates;

import api.Account;
import api.Role;
import greenfield.group.com.security.common.SimpleResult;
import greenfield.group.com.security.dto.AuthenticationRequestDto;
import greenfield.group.com.security.security.jwt.JwtTokenProvider;
import greenfield.group.com.security.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:4200/**")
@RestController
public class AuthGate extends Gate {

    private final AuthenticationManager authenticationManager;

    private final JwtTokenProvider jwtTokenProvider;

    private final AccountService accountService;

    @Autowired
    public AuthGate(AuthenticationManager authenticationManager, JwtTokenProvider jwtTokenProvider, AccountService accountService, RestTemplate restTemplate) {
        this.authenticationManager = authenticationManager;
        this.jwtTokenProvider = jwtTokenProvider;
        this.accountService = accountService;
        this.restTemplate = restTemplate;
    }

    @RequestMapping(path = "/auth-gate/loginalt", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity login(@RequestBody AuthenticationRequestDto requestDto) {
        try {
            String login = requestDto.getLogin();
            Authentication authenticate = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(login, requestDto.getPassword()));
            Account byAccountname = accountService.findByLogin(login);

            if (byAccountname == null) {
                throw new UsernameNotFoundException("User with login: " + login + " not found");
            }

            String token = jwtTokenProvider.createToken(login, authenticate.getAuthorities());

            Map<Object, Object> response = new HashMap<>();
            response.put("login", login);
            response.put("token", token);

            return ResponseEntity.ok(response);
        } catch (AuthenticationException e) {
            throw new BadCredentialsException("Invalid login or password");
        }
    }

    @Autowired
    private RestTemplate restTemplate;

    @RequestMapping(path = "/auth-gate/login", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public SimpleResult<Account> login(@RequestBody Account account) {
        return ((SimpleResult<Account>) this.restTemplate
                .postForEntity(serviceRegistry.get(AUTH_SERVICE) + "/login", account, SimpleResult.class)
                .getBody());
    }

    @RequestMapping(path = "/auth-gate/logout", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public SimpleResult<Account> logout(@RequestBody Account account) {
        return ((SimpleResult<Account>) this.restTemplate
                .postForEntity(serviceRegistry.get(AUTH_SERVICE) + "/logout", account, SimpleResult.class)
                .getBody());
    }

    @RequestMapping(path = "/auth-gate/registry", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public SimpleResult<Account> registry(@RequestBody Account account) {
        return ((SimpleResult<Account>) this.restTemplate
                .postForEntity(serviceRegistry.get(AUTH_SERVICE) + "/registry", account, SimpleResult.class)
                .getBody());
    }

    /**
     * Метод получает список ролей у аккаунта
     *
     * @param uuid уникальный идентификатор аккаунта
     * @return
     */
    @RequestMapping(path = "/auth-gate/getAccountRoleSysNameByUUID", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public Role getAccountRoleSysNameByUUID(@RequestBody String uuid) {
        return this.restTemplate
                .postForEntity(serviceRegistry.get(AUTH_SERVICE) + "/getAccountRoleSysNameByUUID", uuid, Role.class)
                .getBody();
    }
}