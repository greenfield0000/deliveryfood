package greenfield.group.com.journalservice.gates;

import greenfield.group.com.gatecommon.SimpleResult;
import greenfield.group.com.gatecommon.Status;
import greenfield.group.com.journalservice.model.journal.JournalData;
import greenfield.group.com.journalservice.model.journal.JournalMetadataCommon;
import greenfield.group.com.journalservice.requests.ButtonHandlerRequest;
import greenfield.group.com.journalservice.requests.FilterRequest;
import greenfield.group.com.journalservice.requests.LoadJournalRequest;
import greenfield.group.com.journalservice.requests.SavePresetRequest;
import greenfield.group.com.journalservice.response.JournalDataResponse;
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
                Status.OK, journalService.metaDataLoadJournal(loadJournalRequest.getJournalSysName())
        );
    }

    /**
     * Метод загрузки данных журнала согласно его системному имени
     *
     * @param loadJournalRequest запрос с интерфейса при загрузке журнала
     * @return
     */
    @RequestMapping(path = "/loadData", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public SimpleResult<JournalDataResponse> loadData(@RequestBody LoadJournalRequest loadJournalRequest) {
        JournalData journalData = journalService.loadJournalData(
                loadJournalRequest.getJournalSysName(),
                loadJournalRequest.getPageNumber()
        );
        JournalDataResponse journalDataResponse = new JournalDataResponse(journalData);
        return new SimpleResult<>(
                Status.OK
                , journalDataResponse
        );
    }

    /**
     * Метод фильтрации данных
     *
     * @param filterRequest запрос с интерфейса при загрузке журнала
     * @return
     */
    @RequestMapping(path = "/doFilter", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public SimpleResult<JournalDataResponse> doFilter(@RequestBody FilterRequest filterRequest) {
        JournalData journalData = journalService.doFilter(filterRequest.getSysName(), filterRequest.getItemList());
        JournalDataResponse journalDataResponse = new JournalDataResponse(journalData);
        return new SimpleResult<>(
                Status.OK
                , journalDataResponse
        );
    }

    /**
     * Метод сохранения пресета для фильтра
     *
     * @param savePresetRequest запрос с интерфейса на сохранение пресета
     * @return
     */
    @RequestMapping(path = "/savePreset", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public SimpleResult savePreset(@RequestBody SavePresetRequest savePresetRequest) {
        return new SimpleResult<>(
                Status.OK
                , journalService.savePreset(savePresetRequest.getPreset())
        );
    }

    /**
     * Метод вызова обработчика кнопки
     *
     * @param buttonHandlerRequest
     * @return
     */
    @RequestMapping(path = "/doButtonHandler"
            , method = {RequestMethod.POST, RequestMethod.DELETE, RequestMethod.PUT, RequestMethod.GET}
            , produces = MediaType.APPLICATION_JSON_VALUE
    )
    public SimpleResult doButtonHandler(@RequestBody ButtonHandlerRequest buttonHandlerRequest) {
        JournalData journalData = journalService.doButtonHandler(
                buttonHandlerRequest.getRequestMethod()
                , buttonHandlerRequest.getJournalSysName()
                , buttonHandlerRequest.getButtonAction()
                , buttonHandlerRequest.getEntity()
                , buttonHandlerRequest.getPageNumber());
        JournalDataResponse journalDataResponse = new JournalDataResponse(journalData);

        return new SimpleResult<>(
                Status.OK
                , journalDataResponse
        );
    }

}
