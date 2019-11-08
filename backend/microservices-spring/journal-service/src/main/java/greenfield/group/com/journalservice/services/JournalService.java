package greenfield.group.com.journalservice.services;


import greenfield.group.com.journalservice.exceptions.JournalRepositoryException;
import greenfield.group.com.journalservice.model.journal.*;
import greenfield.group.com.journalservice.model.requests.LoadJournalDataRequest;
import greenfield.group.com.journalservice.repositories.JournalRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

/**
 * Апи для работы с журналом
 */
@Slf4j
@Service
public class JournalService implements Journal {

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
    public JournalMetadataCommon metaDataLoadJournal(String sysName) {
        JournalMetadataCommon journalMetadata = new JournalMetadataCommon();
        try {
            journalMetadata = journalRepository.metaDataLoad(sysName);
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
    public JournalData loadJournalData(String sysName, int pageNumber) {
        // Загружаем метадату журнала
        JournalMetadataCommon journalMetadata = metaDataLoadJournal(sysName);
        if (journalMetadata != null) {
            JournalColumnMetaData columnMetaData = journalMetadata.getColumnMetaData();
            if (columnMetaData != null) {
                String serviceName = journalMetadata.getServiceName();
                String methodDataName = journalMetadata.getMethodDataName();
                if (serviceName != null && methodDataName != null && !serviceName.isEmpty() && !methodDataName.isEmpty()) {
                    LoadJournalDataRequest loadJournalDataRequest = new LoadJournalDataRequest();
                    loadJournalDataRequest.setPageNumber(Math.max(pageNumber, 0));
                    JournalData journalData = restTemplate
                            .getForEntity(serviceName + "/" + methodDataName,  JournalData.class, loadJournalDataRequest)
                            .getBody();
                    if (journalData != null) {
                        return journalData;
                    }
                }
            }
        }
        return new JournalData();
    }

    @Override
    public JournalData doFilter(String journalSysName, List<JournalFilterItem> journalFilterItemList) {
        return null;
    }

    @Override
    public List<Preset> savePreset(Preset preset) {
        return null;
    }

    @Override
    public JournalData doButtonHandler(String journalSysName, String buttonAction, int pageNumber) {
        return null;
    }
}
