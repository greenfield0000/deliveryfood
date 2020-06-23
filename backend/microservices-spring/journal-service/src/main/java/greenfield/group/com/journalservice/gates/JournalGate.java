package greenfield.group.com.journalservice.gates;

import greenfield.group.com.gatecommon.SimpleResult;
import greenfield.group.com.gatecommon.Status;
import greenfield.group.com.journalservice.model.journal.JournalDataDTO;
import greenfield.group.com.journalservice.model.journal.JournalMetadataCommonDTO;
import greenfield.group.com.journalservice.requests.ButtonHandlerRequest;
import greenfield.group.com.journalservice.requests.FilterRequest;
import greenfield.group.com.journalservice.requests.LoadJournalRequest;
import greenfield.group.com.journalservice.requests.SavePresetRequest;
import greenfield.group.com.journalservice.response.JournalDataResponse;
import greenfield.group.com.journalservice.services.JournalServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController(value = "/journal")
public class JournalGate {

    @Autowired
    private JournalServiceImpl journalServiceImpl;

    /**
     * Метод загрузки метаданных-журнала согласно его системному имени
     *
     * @param loadJournalRequest запрос с интерфейса при загрузке журнала
     * @return
     */
    @RequestMapping(path = "/load", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public SimpleResult<JournalMetadataCommonDTO> load(@RequestBody LoadJournalRequest loadJournalRequest) {
        return new SimpleResult<>(
                Status.OK, journalServiceImpl.metaDataLoadJournal(loadJournalRequest.getJournalSysName())
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
        JournalDataDTO journalData = journalServiceImpl.loadJournalData(
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
        JournalDataDTO journalData = journalServiceImpl.doFilter(filterRequest.getSysName(), filterRequest.getItemList());
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
                , journalServiceImpl.savePreset(savePresetRequest.getPresetDTO())
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
        JournalDataDTO journalData = journalServiceImpl.doButtonHandler(
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
