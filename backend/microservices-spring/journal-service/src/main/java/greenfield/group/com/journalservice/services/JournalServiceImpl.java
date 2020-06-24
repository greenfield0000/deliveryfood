package greenfield.group.com.journalservice.services;


import greenfield.group.com.gatecommon.SimpleResult;
import greenfield.group.com.journalservice.exceptions.JournalRepositoryException;
import greenfield.group.com.journalservice.model.journal.*;
import greenfield.group.com.journalservice.repositories.JournalRepository;
import greenfield.group.com.journalservice.repositories.model.Journal;
import greenfield.group.com.journalservice.repositories.model.JournalButton;
import greenfield.group.com.journalservice.repositories.model.JournalColumnDescription;
import greenfield.group.com.journalservice.repositories.model.JournalColumnParam;
import greenfield.group.com.journalservice.requests.LoadJournalDataRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * Апи для работы с журналом
 */
@Slf4j
@Service
public class JournalServiceImpl implements JournalService {

    @Autowired
    private JournalRepository journalRepository;
    @Autowired
    private RestTemplate restTemplate;

    /**
     * Загрузка журнала согласно параметрам
     *
     * @param sysName системное имя журнала
     * @return
     */
    @Override
    public JournalMetadataCommonDTO metaDataLoadJournal(String sysName) {
        JournalMetadataCommonDTO journalMetadata = new JournalMetadataCommonDTO();
        try {
            Journal journal = journalRepository.findJournalBySysName(sysName);
            if (journal == null) {
                return journalMetadata;
            }
            journalMetadata.setServiceName(journal.getServiceName());
            journalMetadata.setGateName(journal.getGateName());

            // Маппим кнопочки
            Set<JournalButton> buttonSet = journal.getButtonSet();
            if (buttonSet != null) {
                Set<JournalButtonDTO> buttonDTOSet = buttonSet.stream()
                        .map(button -> JournalButtonDTO.builder()
                                .hint(button.getHint())
                                .name(button.getName())
                                .cssImageName(button.getCssImageName())
                                .handlerFnName(button.getHandlerFnName())
                                .build()
                        ).collect(Collectors.toSet());
                journalMetadata.setButtonList(buttonDTOSet);
            }

            // Маппим колонки
            JournalColumnDescription journalColumnDescription = journal.getJournalColumnDescription();
            if (journalColumnDescription != null) {
                Set<JournalColumnParam> journalColumnParams = journalColumnDescription.getJournalColumnParams();
                if (journalColumnParams != null) {
                    List<JournalColumnDTO> columnList = journalColumnParams.stream()
                            .map(column -> JournalColumnDTO.builder()
                                    .field(column.getField())
                                    .headerName(column.getHeaderName())
                                    .checkboxSelection(column.getCheckboxselection())
                                    .filter(column.getFilter())
                                    .sortable(column.getSortable())
                                    .build()
                            )
                            .collect(Collectors.toList());

                    JournalColumnMetaDataDTO columnMetaData = new JournalColumnMetaDataDTO();
                    columnMetaData.setList(columnList);
                    journalMetadata.setColumnMetaData(columnMetaData);
                }
            }


        } catch (JournalRepositoryException e) {
            log.error("With load journal erised error " + e);
        }
        return journalMetadata;
    }

    /**
     * Общая загрузка данных журнала по системному имени
     *
     * @param sysName    системное имя журнала
     * @param pageNumber номер страницы
     * @return возвращает данные журнала
     */
    @Override
    public JournalDataDTO loadJournalData(String sysName, int pageNumber) {
        // Загружаем метадату журнала
        JournalMetadataCommonDTO journalMetadata = metaDataLoadJournal(sysName);
        if (journalMetadata != null) {
            JournalColumnMetaDataDTO columnMetaData = journalMetadata.getColumnMetaData();
            if (columnMetaData != null) {
                String serviceName = journalMetadata.getServiceName();
                String gateName = journalMetadata.getGateName();
                if (serviceName != null && gateName != null && !serviceName.isEmpty() && !gateName.isEmpty()) {
                    LoadJournalDataRequest loadJournalDataRequest = new LoadJournalDataRequest();
                    loadJournalDataRequest.setPageNumber(Math.max(pageNumber, 0));
                    List loadData = restTemplate
                            .getForEntity(serviceName + "/" + gateName + "/loadJournal", List.class, loadJournalDataRequest)
                            .getBody();
                    if (loadData != null) {
                        return new JournalDataDTO(loadData, pageNumber);
                    }
                }
            }
        }
        return new JournalDataDTO();
    }

    @Override
    public JournalDataDTO doFilter(String journalSysName, List<JournalFilterItemDTO> journalFilterItemDTOList) {
        return new JournalDataDTO();
    }

    @Override
    public List<PresetDTO> savePreset(PresetDTO presetDTO) {
        return new ArrayList<>();
    }

    @Override
    public JournalDataDTO doButtonHandler(RequestMethod requestMethod, String journalSysName, String buttonAction, Map<String, Object> entity, int pageNumber) {
        // Загружаем метадату журнала
        JournalMetadataCommonDTO journalMetadata = metaDataLoadJournal(journalSysName);
        if (journalMetadata != null) {
            JournalColumnMetaDataDTO columnMetaData = journalMetadata.getColumnMetaData();
            if (columnMetaData != null) {
                String serviceName = journalMetadata.getServiceName();
                String gateName = journalMetadata.getGateName();
                if (serviceName != null && gateName != null && !serviceName.isEmpty() && !gateName.isEmpty()) {
                    LoadJournalDataRequest loadJournalDataRequest = new LoadJournalDataRequest();
                    loadJournalDataRequest.setEntity(entity);
                    loadJournalDataRequest.setPageNumber(Math.max(pageNumber, 0));
                    List loadData = callButtonAction(
                            requestMethod, buttonAction, serviceName, gateName, entity
                    );
                    if (loadData != null) {
                        return new JournalDataDTO(loadData, pageNumber);
                    }
                }
            }
        }
        return new JournalDataDTO();
    }

    /**
     * Вызов обработика кнопки
     *
     * @param buttonAction название метода кнопки
     * @param serviceName  имя сервиса
     * @param gateName     имя гейта
     * @param requestDTO   объект запроса
     * @return
     */
    private <T> List callButtonAction(RequestMethod requestMethod, String buttonAction, String serviceName, String gateName, T requestDTO) {

        List resultBody = new ArrayList();
        String url = serviceName + "/" + gateName + "/" + buttonAction;
        HttpEntity<T> httpEntity = new HttpEntity<>(requestDTO);
        switch (requestMethod) {
            case GET: {
                resultBody = this.restTemplate
                        .getForEntity(url, List.class, httpEntity)
                        .getBody();
                break;
            }
            case PUT: {
                resultBody = this.restTemplate
                        .exchange(url, HttpMethod.PUT, httpEntity, List.class)
                        .getBody();
                break;
            }
            case POST: {
                resultBody = this.restTemplate
                        .postForEntity(url, httpEntity, List.class)
                        .getBody();
                break;
            }
            case DELETE: {
                this.restTemplate
                        .exchange(url, HttpMethod.DELETE, httpEntity, SimpleResult.class)
                        .getBody();
                break;
            }
        }
        return resultBody;
    }
}

