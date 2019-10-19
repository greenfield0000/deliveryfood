package greenfield.group.com.authservice.security.security.jwt;

import greenfield.group.com.authservice.model.Account;
import greenfield.group.com.authservice.model.Role;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Implementation of Factory Method for class {@link JwtAccount}.
 *
 * @author Ivanov Roman
 * @version 1.0
 */

public final class JwtAccountFactory {

    public JwtAccountFactory() {
    }

    public static JwtAccount create(Account account) {
        Role role = new Role();
        role.setName("USER");
        return new JwtAccount(
                account.getId(),
                account.getNickName(),
                account.getPassword(),
                true,
                new Date(),
                mapToGrantedAuthorities(Collections.singletonList(role))
                //                account.getStatus().equals(Status.ACTIVE),
                //                account.getUpdated()
        );
    }

    private static List<GrantedAuthority> mapToGrantedAuthorities(List<Role> accountRoles) {
        return accountRoles.stream()
                .map(role ->
                        new SimpleGrantedAuthority(role.getName())
                ).collect(Collectors.toList());
    }
}
