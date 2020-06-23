package greenfield.group.com.menuservice.gates;

import greenfield.group.com.gatecommon.SimpleResult;
import greenfield.group.com.gatecommon.Status;
import greenfield.group.com.menuservice.services.MenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController(value = "/menu")
public class MenuGate {

//    @Autowired
//    private RestTemplate restTemplate;
    @Autowired
    private MenuService menuService;

    /**
     * Метод получения списка меню для пользователя
     *
     * @param authorizationToken хэш пользователя
     * @return
     */
    @RequestMapping(path = "/getMenu", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public SimpleResult<String> getMenu(@RequestHeader(value = "Authorization", defaultValue = "") String authorizationToken) {
        return new SimpleResult<>(Status.OK, menuService.getMenu(authorizationToken));
    }

}
