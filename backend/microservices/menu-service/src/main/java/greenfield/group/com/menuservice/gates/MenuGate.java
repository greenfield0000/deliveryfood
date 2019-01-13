package greenfield.group.com.menuservice.gates;

import entities.authservice.Role;
import enums.Status;
import greenfield.group.com.menuservice.services.MenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import results.SimpleResult;

@CrossOrigin
@RestController(value = "/menu")
public class MenuGate {

    @Autowired
    private RestTemplate restTemplate;
    @Autowired
    private MenuService menuService;


    @RequestMapping(path = "/getMenu", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public SimpleResult<String> getMenu(@RequestBody String uuid) {
        Role findedRole = restTemplate
                .postForObject("http://auth-service:8081/auth/getAccountRoleSysNameByUUID",
                        uuid, Role.class);
        String jsonMenu = "";
        if (findedRole != null) {
            jsonMenu = menuService.getMenuByOwnerSysName(findedRole.getSysname());
        }
        return new SimpleResult<>(Status.OK, jsonMenu);
    }

}
