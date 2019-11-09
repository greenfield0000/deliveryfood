package changesets.journal;

import changesets.ChangeSetScriptLoader;
import com.github.mongobee.changeset.ChangeLog;
import com.github.mongobee.changeset.ChangeSet;
import com.mongodb.BasicDBObject;
import com.mongodb.DBCollection;
import exceptions.DataBaseDataException;
import org.jongo.Jongo;
import org.jongo.MongoCollection;
import org.jongo.MongoCursor;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Ченджсеты мета-информации журнала. Выполняются в самую последнюю очередь
 */
@ChangeLog(order = "99999")
public class JournalStructureChangeSet {

    // TODO Вынести в отдельную джарку

    private class JournalMetadata {
        private List<String> buttonIdList;
        private List<JournalColumn> columnList;
        private JournalFilter filter;
    }

    private class JournalColumn {
        private String id;
        private String headerName;
        private String field;
        private boolean sortable;
        private boolean filter;
        private boolean checkboxSelection;
    }

    private class JournalButton {
        private String id;
        private String name;
        private String hint;
        private String cssImageName;
        private String handlerFnName;
    }

    private class JournalFilter {
        private String id;
    }


    private ChangeSetScriptLoader scriptLoader = new ChangeSetScriptLoader();

    @ChangeSet(order = "1", id = "registry_journal_structure_personal", author = "Ivanov Roman")
    public void registryJournalPersonalStructure(Jongo database) throws IOException {
        final String scriptPath = "scripts/journal/personal-journal-structure.json";
        final MongoCollection menuCollection = database.getCollection("journal");
        menuCollection.insert(scriptLoader.getDocumentFromResourceByPath(scriptPath));
    }

    @ChangeSet(order = "2", id = "upgradeJournalPersonalByButtonsAndColumns", author = "Ivanov Roman")
    public void upgradeJournalPersonalByButtonsAndColumns(Jongo database) throws IOException {
        final MongoCollection journalButtonCollection = database.getCollection("journal-button");
        final MongoCursor<Map> journalButtonList = journalButtonCollection.find(
                "{\"name\": {\"$in\": [\"createNewPerson\", \"editPerson\"," +
                        " \"deletePerson\"]}},{\"_id\": 1}")
                .as(Map.class);

        List<String> buttonIdList = new ArrayList<>();
        if (journalButtonList != null) {
            while (journalButtonList.hasNext()) {
                final Map next = journalButtonList.next();
                final String id = "\"" + next.get("_id").toString() + "\"";
                buttonIdList.add(id);
            }
        }

        if (!buttonIdList.isEmpty()) {
            final DBCollection journal = database.getCollection("journal").getDBCollection();
            final BasicDBObject query = new BasicDBObject();
            query.append("sysname", "Personals-jrnl");
            BasicDBObject basicDBObject = new BasicDBObject();
            basicDBObject.append("button_id", buttonIdList.toArray());
            final BasicDBObject bsonList = new BasicDBObject();
            bsonList.put("$set", basicDBObject);
            journal.update(query, bsonList, true, false);
        }
    }

    @ChangeSet(order = "3", id = "createLinkBetweenPersonJournalAndColumnOnFirstStart", author = "Ivanov Roman")
    public void createLinkBetweenPersonJournalAndColumnOnFirstStart(Jongo database) throws IOException, DataBaseDataException {
        final MongoCollection journalColumnCollection = database.getCollection("journal-column");
        final MongoCursor<Map> journalColumnList = journalColumnCollection.find(
                "{\"sysName\": \"setColumnForPersonalJournal\"},{\"_id\": \"1\"}")
                .as(Map.class);

        String columnId = "";
        if (journalColumnList != null) {
            if (journalColumnList.count() != 1) {
                throw new DataBaseDataException("Wrong count column. Must be only 1");
            }
            while (journalColumnList.hasNext()) {
                final Map next = journalColumnList.next();
                columnId = "\"" + next.get("_id").toString() + "\"";
            }
        }

        if (!columnId.isEmpty()) {
            final DBCollection journal = database.getCollection("journal").getDBCollection();
            final BasicDBObject query = new BasicDBObject();
            query.append("sysname", "Personals-jrnl");
            BasicDBObject basicDBObject = new BasicDBObject();
            basicDBObject.append("column_id", columnId);
            final BasicDBObject bsonList = new BasicDBObject();
            bsonList.put("$set", basicDBObject);
            journal.update(query, bsonList, true, false);
        }
    }

    @ChangeSet(order = "4", id = "createLinkBetweenPersonJournalAndPreset", author = "Ivanov Roman")
    public void createLinkBetweenPersonJournalAndPreset(Jongo database) throws IOException, DataBaseDataException {
        final MongoCollection journalPresetCollection = database.getCollection("journal-preset");
        final MongoCursor<Map> journalPresetList = journalPresetCollection.find(
                "{\"sysName\": \"PersonalJournal\"},{\"_id\": \"1\"}")
                .as(Map.class);

        List<String> presetIdList = new ArrayList<>();
        if (journalPresetList != null) {
            while (journalPresetList.hasNext()) {
                final Map next = journalPresetList.next();
                final String id = "\"" + next.get("_id").toString() + "\"";
                presetIdList.add(id);
            }
        }

        if (!presetIdList.isEmpty()) {
            final DBCollection journal = database.getCollection("journal").getDBCollection();
            final BasicDBObject query = new BasicDBObject();
            query.append("sysname", "Personals-jrnl");
            BasicDBObject basicDBObject = new BasicDBObject();
            basicDBObject.append("preset_id", presetIdList.toArray());
            final BasicDBObject bsonList = new BasicDBObject();
            bsonList.put("$set", basicDBObject);
            journal.update(query, bsonList, true, false);
        }
    }


}
