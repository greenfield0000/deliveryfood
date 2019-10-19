package greenfield.group.com.menuservice.services;

import greenfield.group.com.menuservice.Menu;
import greenfield.group.com.menuservice.repository.MenuRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MenuService {

    @Autowired
    private MenuRepository menuRepository;

    /**
     * Получить структуру меню
     *
     * @return
     */
    public String getMenu() {
        // TODO пока получим все меню
        List<Menu> menuListByOwner = menuRepository
                .findAll();
        Menu menu = menuListByOwner.get(0);
        return (menu != null) ? menu.getJsonMenu() : "";
    }

}
