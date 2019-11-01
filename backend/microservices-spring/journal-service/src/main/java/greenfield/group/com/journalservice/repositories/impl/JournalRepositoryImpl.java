package greenfield.group.com.journalservice.repositories.impl;


import greenfield.group.com.journalservice.exceptions.JournalRepositoryException;
import greenfield.group.com.journalservice.journal.JournalMetadata;
import greenfield.group.com.journalservice.repositories.JournalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Основной репозиторий для загрузки метаданных журнала
 */
@Repository
public class JournalRepositoryImpl implements JournalRepository {

    private static final String JOURNAL = "journal";

    @Autowired
    private MongoTemplate mongoTemplate;

    @Override
    public JournalMetadata metaDataLoad(String journalSysName) throws JournalRepositoryException {
        Aggregation aggregation = Aggregation.newAggregation(
                Aggregation.project("id"),
                // Выбираем кнопки
                Aggregation.lookup("journal-button", "button_id", "id", "buttonList"),
                // Выбираем колонки
                Aggregation.lookup("journal-column", "column_id", "id", "columnMetaData"),
                Aggregation.unwind("columnMetaData")
        );
        List<JournalMetadata> journalList = mongoTemplate.aggregate(aggregation, JOURNAL, JournalMetadata.class)
                .getMappedResults();
        // Журнал всегда должен быть один
        if (journalList.size() != 1) {
            throw new JournalRepositoryException("Не удалось однозначно определить журнал.");
        }

        return journalList.stream().findAny().get();
    }
}
