package greenfield.group.com.security.dto;

import lombok.Data;

/**
 * DTO class for authentication (login) request.
 *
 * @author Ivanov Roman
 * @version 1.0
 */

@Data
public class AuthenticationRequestDto {
    private String login;
    private String password;
}
