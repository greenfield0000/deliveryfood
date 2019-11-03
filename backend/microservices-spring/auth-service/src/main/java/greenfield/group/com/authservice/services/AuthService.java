package greenfield.group.com.authservice.services;

import com.fasterxml.jackson.databind.ObjectMapper;
import greenfield.group.com.authservice.dto.response.LoginAccountResponseDTO;
import greenfield.group.com.authservice.kafka.KafkaSenderService;
import greenfield.group.com.authservice.model.Account;
import greenfield.group.com.authservice.model.Role;
import greenfield.group.com.authservice.model.User;
import greenfield.group.com.authservice.security.repository.AccountRepository;
import greenfield.group.com.authservice.security.security.jwt.JwtTokenProvider;
import greenfield.group.com.gatecommon.SimpleResult;
import greenfield.group.com.gatecommon.Status;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.Optional;
import java.util.UUID;

/**
 * Сервис по работе с аккаунтом
 */
@Service
public class AuthService {

    @Autowired
    private ObjectMapper objectMapper;
    @Autowired
    private AccountRepository accountRepository;
    @Autowired
    private JwtTokenProvider jwtTokenProvider;
    @Autowired
    private KafkaSenderService kafkaSenderService;

    /**
     * Залогиниться
     *
     * @param account
     * @return
     */
    public SimpleResult<LoginAccountResponseDTO> signIn(Account account) {
        // Должен быть известен логин и пароль
        if ((account == null) || ((account.getLogin() == null) || (account.getLogin().isEmpty()))
                || ((account.getPassword() == null) || (account.getPassword().isEmpty()))) {
            return new SimpleResult<>(Status.ERROR, "Ошибка авторизации", null);
        }

        Optional<Account> finderAccount = accountRepository
                .findByLoginAndPassword(account.getLogin(), account.getPassword());

        // если пытаемся залогиниться под пользователем, которого нет
        if (!finderAccount.isPresent()) {
            return new SimpleResult<>(Status.ERROR, "Ошибка авторизации", null);
        }

        account = finderAccount.get();
        accountRepository.save(account);
        LoginAccountResponseDTO loginAccountResponseDTO = LoginAccountResponseDTO.accountToDTO(account);
        Role accountRole = new Role();
        accountRole.setId(1L);
        accountRole.setName("Пользователь");
        accountRole.setSysname("USER");
        loginAccountResponseDTO.setToken(jwtTokenProvider.createToken(
                loginAccountResponseDTO.getLogin(),
                Arrays.asList(accountRole)
        ));
        return new SimpleResult<>(Status.OK, loginAccountResponseDTO);
    }

    /**
     * Разлогиниться
     *
     * @param account
     * @return
     */
    public SimpleResult<Account> signOut(Account account) {
        // Должен быть известен логин и пароль
        if ((account == null) || ((account.getLogin() == null) || (account.getLogin().isEmpty()))
                || ((account.getPassword() == null) || (account.getPassword().isEmpty()))) {
            return new SimpleResult<>(Status.ERROR, "Невозможно выполнить данное действие", null);
        }
        Optional<Account> finderAccount = accountRepository
                .findByLoginAndPassword(account.getLogin(), account.getPassword());

        // если пытаемся залогиниться под пользователем, которого нет
        if (!finderAccount.isPresent()) {
            return new SimpleResult<>(Status.ERROR, "Невозможно выполнить данное действие", null);
        }

        account = finderAccount.get();
        accountRepository.save(account);
        return new SimpleResult<>(Status.OK, account);
    }

    /**
     * Зарегистрироваться
     *
     * @param account
     * @return
     */
    @Transactional
    public SimpleResult<Account> registry(Account account) {
        // Должен быть известен логин и пароль
        if ((account == null) || ((account.getLogin() == null) || (account.getLogin().isEmpty()))
                || ((account.getPassword() == null) || (account.getPassword().isEmpty()))) {
            return new SimpleResult<>(Status.ERROR, "Недостаточно данных для регистрации, попробуйте еще раз.", null);
        }

        // найдем пользователя с таким именем
        Optional<Account> finderAccount = accountRepository.findByLogin(account.getLogin());
        // если не нашли, то значит это не повторная регистрация
        if (!finderAccount.isPresent()) {
            // тогда регистрируем и выходим
            String uuid = UUID.randomUUID().toString();
            account.setUuid(uuid);
            final Account savedAccount = accountRepository.saveAndFlush(account);
            // Отправляем информацию о новом пользователе в другие сервисы
            User user = account.getUser();
            user.setUuid(uuid);
            kafkaSenderService.send(user);
            return new SimpleResult<>(Status.OK, savedAccount);
        }

        return new SimpleResult<>(Status.OK, account);
    }

}
