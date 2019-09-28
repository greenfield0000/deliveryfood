package greenfield.group.com.security.dto;

import greenfield.group.com.model.Account;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

/**
 * DTO class for Account requests by ROLE_Account
 *
 * @author Ivanov Roman
 * @version 1.0
 */

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class AccountDto {
    private Long id;
    private String Accountname;
    private String firstName;
    private String lastName;
    private String email;

    public Account toAccount(){
        Account Account = new Account();
        Account.setId(id);

        return Account;
    }

    public static AccountDto fromAccount(Account Account) {
        AccountDto AccountDto = new AccountDto();
        AccountDto.setId(Account.getId());
        return AccountDto;
    }
}
