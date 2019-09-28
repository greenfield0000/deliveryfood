package greenfield.group.com.security.security;

import greenfield.group.com.model.Account;
import greenfield.group.com.security.security.jwt.JwtAccount;
import greenfield.group.com.security.security.jwt.JwtAccountFactory;
import greenfield.group.com.security.service.AccountService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

/**
 * @author Ivanov Roman
 * @version 1.0
 */

@Service
@Slf4j
public class JwtAccountDetailsService implements UserDetailsService {

    private final AccountService accountService;

    @Autowired
    public JwtAccountDetailsService(AccountService accountService) {
        this.accountService = accountService;
    }

    @Override
    public UserDetails loadUserByUsername(String nickName) throws UsernameNotFoundException {
        Account account = accountService.findByLogin(nickName);

        if (account == null) {
            throw new UsernameNotFoundException("Account with Accountname: " + nickName + " not found");
        }

        JwtAccount jwtAccount = JwtAccountFactory.create(account);
        log.info("IN loadAccountByAccountname - Account with Accountname: {} successfully loaded", nickName);
        return jwtAccount;
    }

}
