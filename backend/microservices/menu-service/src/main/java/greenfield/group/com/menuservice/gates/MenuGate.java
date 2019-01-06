package greenfield.group.com.menuservice.gates;

import enums.Status;
import greenfield.group.com.menuservice.repository.MenuRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import response.GateResponse;
import results.SimpleResult;

@CrossOrigin
@RestController(value = "/menu")
public class MenuGate {

    @Autowired
    private MenuRepository menuRepository;

    @RequestMapping(path = "/getMenu", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public SimpleResult<String> getMenu(@RequestBody String uuid) {
        return new GateResponse<>(new SimpleResult<>(Status.OK, "123", "{\n" +
                "    \"node-1\": {\n" +
                "        \"sysname\": \"Administration\",\n" +
                "        \"name\": \"Администрирование\",\n" +
                "        \"children\": [\n" +
                "            {\n" +
                "                \"node-1-1\": {\n" +
                "                    \"sysname\": \"RegistryEmployee\",\n" +
                "                    \"name\": \"Зарегистировать нового сотрудника\"\n" +
                "                }\n" +
                "            },\n" +
                "            {\n" +
                "                \"node-1-2\": {\n" +
                "                    \"sysname\": \"ViewEmployee\",\n" +
                "                    \"name\": \"Посмотреть список сотружников\"\n" +
                "                }\n" +
                "            }\n" +
                "        ]\n" +
                "    },\n" +
                "    \"node-2\": {\n" +
                "        \"sysname\": \"Booking\",\n" +
                "        \"name\": \"Бронирование\",\n" +
                "        \"children\": [\n" +
                "            {\n" +
                "                \"node-2-1\": {\n" +
                "                    \"sysname\": \"OrderACake\",\n" +
                "                    \"name\": \"Заказать торт\"\n" +
                "                }\n" +
                "            },\n" +
                "            {\n" +
                "                \"node-2-2\": {\n" +
                "                    \"sysname\": \"Reservations\",\n" +
                "                    \"name\": \"Бронирование столов\"\n" +
                "                }\n" +
                "            }\n" +
                "        ]\n" +
                "    },\n" +
                "    \"node-3\": {\n" +
                "        \"sysname\": \"Planning\",\n" +
                "        \"name\": \"Планирование\",\n" +
                "        \"children\": [\n" +
                "            {\n" +
                "                \"node-3-1\": {\n" +
                "                    \"sysname\": \"ViewShedule\",\n" +
                "                    \"name\": \"Просмотреть график работы\"\n" +
                "                }\n" +
                "            },\n" +
                "            {\n" +
                "                \"node-3-2\": {\n" +
                "                    \"sysname\": \"EditShedule\",\n" +
                "                    \"name\": \"Изменить график работы\"\n" +
                "                }\n" +
                "            }\n" +
                "        ]\n" +
                "    }\n" +
                "}\n")).getResult();
    }

}
