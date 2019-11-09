package greenfield.group.com.journalservice.gates;

import greenfield.group.com.gatecommon.SimpleResult;
import greenfield.group.com.gatecommon.Status;
import greenfield.group.com.journalservice.model.journal.JournalData;
import greenfield.group.com.journalservice.model.journal.JournalMetadataCommon;
import greenfield.group.com.journalservice.model.requests.FilterRequest;
import greenfield.group.com.journalservice.requests.LoadJournalRequest;
import greenfield.group.com.journalservice.services.JournalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController(value = "/journal")
public class JournalGate {

    @Autowired
    private JournalService journalService;

    /**
     * Метод загрузки метаданных-журнала согласно его системному имени
     *
     * @param loadJournalRequest запрос с интерфейса при загрузке журнала
     * @return
     */
    @RequestMapping(path = "/load", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public SimpleResult<JournalMetadataCommon> load(@RequestBody LoadJournalRequest loadJournalRequest) {
        return new SimpleResult<>(
                Status.OK, journalService.metaDataLoadJournal(loadJournalRequest.getSysName())
        );
    }

    /**
     * Метод загрузки метаданных-журнала согласно его системному имени
     *
     * @param loadJournalRequest запрос с интерфейса при загрузке журнала
     * @return
     */
    @RequestMapping(path = "/loadData", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public SimpleResult<JournalData> loadData(@RequestBody LoadJournalRequest loadJournalRequest) {
        return new SimpleResult<>(
                Status.OK
                , journalService.loadJournalData(loadJournalRequest.getSysName(), loadJournalRequest.getPageNumber())
        );
    }

    /**
     * Метод фильтрации данных
     *
     * @param filterRequest запрос с интерфейса при загрузке журнала
     * @return
     */
    @RequestMapping(path = "/doFilter", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public SimpleResult<JournalData> doFilter(@RequestBody FilterRequest filterRequest) {
        return new SimpleResult<>(
                Status.OK
                , journalService.doFilter(filterRequest.getSysName(), filterRequest.getItemList())
        );
    }

}
