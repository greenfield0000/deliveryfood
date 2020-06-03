package greenfield.group.com.menuservice.services;

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

    /**
     * Получить структуру меню согласно токену пользователя
     *
     * @param authorizationToken токен авторизации
     * @return строка, список меню в формате json
     */
    public String getMenu(String authorizationToken) {
        String ownerSysName;
        try {
            List<String> roleList = tokenService.getRole(authorizationToken);
            if ((roleList != null) && (!roleList.isEmpty())) {
                // Получили меню, по системному имени
//                List<Menu> menuListByOwner = menuRepository
//                        .findByOwnerRoleIn(roleList);
                // Меню должно быть в единственном экземпляре
//                if ((menuListByOwner == null) || (menuListByOwner.size() != 1)) {
//                    return "";
//                }
                return "";
//                Menu menu = menuListByOwner.get(0);
//                return (menu != null) ? menu.getJsonMenu() : "";
            }
        } catch (JwtAuthenticationException e) {
            log.error(e);
        }
        return "";
    }

}
