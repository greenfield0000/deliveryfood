package greenfield.group.com.journalservice.services;


import greenfield.group.com.journalservice.exceptions.JournalRepositoryException;
import greenfield.group.com.journalservice.model.journal.*;
import greenfield.group.com.journalservice.requests.LoadJournalDataRequest;
import greenfield.group.com.journalservice.repositories.JournalRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
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
                String gateName = journalMetadata.getGateName();
                if (serviceName != null && gateName != null && !serviceName.isEmpty() && !gateName.isEmpty()) {
                    LoadJournalDataRequest loadJournalDataRequest = new LoadJournalDataRequest();
                    loadJournalDataRequest.setPageNumber(Math.max(pageNumber, 0));
                    List loadData = restTemplate
                            .getForEntity(serviceName + "/" + gateName + "/loadJournal", List.class, loadJournalDataRequest)
                            .getBody();
                    if (loadData != null) {
                        return new JournalData(loadData, pageNumber);
                    }
                }
            }
        }
        return new JournalData();
    }

    @Override
    public JournalData doFilter(String journalSysName, List<JournalFilterItem> journalFilterItemList) {
        return new JournalData();
    }

    @Override
    public List<Preset> savePreset(Preset preset) {
        return new ArrayList<>();
    }

    @Override
    public JournalData doButtonHandler(String journalSysName, String buttonAction, int pageNumber) {
        return new JournalData();
    }
}
