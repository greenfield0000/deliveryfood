package greenfield.group.com.menuservice.services;

import greenfield.group.com.model.Menu;
import greenfield.group.com.menuservice.repository.MenuRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MenuService {

    @Autowired
    private MenuRepository menuRepository;

    /**
     * Получить структуру меню согласно системноу имени владельца
     * (системное имя роли аккаунта)
     *
     * @param ownerSysName - системное имя роли аккаунта
     * @return
     */
    public String getMenuByOwnerSysName(String ownerSysName) {
        if ((ownerSysName != null) && (!ownerSysName.isEmpty())) {

            // Получили меню, по системному имени
            List<Menu> menuListByOwner = menuRepository
                    .findByOwnerRoleIn(ownerSysName);

            // Меню должно быть в единственном экземпляре
            if ((menuListByOwner == null) || (menuListByOwner.size() != 1)) {
                return "";
            }
            Menu menu = menuListByOwner.get(0);

            return (menu != null) ? menu.getJsonMenu() : "";
        }

        return "";
    }

}
