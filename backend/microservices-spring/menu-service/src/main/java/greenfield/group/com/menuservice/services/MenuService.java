package greenfield.group.com.menuservice.services;

import greenfield.group.com.menuservice.repository.MenuRepository;
import greenfield.group.com.menuservice.repository.model.MenuDescriptor;
import greenfield.group.com.menuservice.security.JwtTokenService;
import greenfield.group.com.menuservice.security.exceptions.JwtAuthenticationException;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Log4j2
public class MenuService {

    @Autowired
    private JwtTokenService tokenService;
    @Autowired
    private MenuRepository menuRepository;


    /**
     * Получить структуру меню согласно токену пользователя
     *
     * @param authorizationToken токен авторизации
     * @return строка, список меню в формате json
     */
    public String getMenu(String authorizationToken) {
        try {
            List<String> roleList = tokenService.getRole(authorizationToken);
            if ((roleList != null) && (!roleList.isEmpty())) {
                String roleName = roleList.stream()
                        .findFirst()
                        .get();
                MenuDescriptor menuDescriptor = menuRepository.findByRoleName(roleName);
                return menuDescriptor.getJsonMenu();
            }
        } catch (JwtAuthenticationException e) {
            log.error(e);
        }
        return "";
    }

}
