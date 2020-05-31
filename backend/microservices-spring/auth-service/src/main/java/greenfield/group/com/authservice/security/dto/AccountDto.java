package greenfield.group.com.authservice.security.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import greenfield.group.com.authservice.model.Account;

/**
 * DTO class for Account requests by ROLE_Account
 *
 * @author Ivanov Roman
 * @version 1.0
 */

@JsonIgnoreProperties(ignoreUnknown = true)
public class AccountDto {
    private Long id;
    private String Accountname;
    private String firstName;
    private String lastName;
    private String email;

    public static AccountDto fromAccount(Account Account) {
        AccountDto AccountDto = new AccountDto();
        AccountDto.setId(Account.getId());
        return AccountDto;
    }

    public Account toAccount() {
        Account Account = new Account();
        Account.setId(id);

        return Account;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAccountname() {
        return Accountname;
    }

    public void setAccountname(String accountname) {
        Accountname = accountname;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
