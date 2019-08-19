package changesets.journal.column;

import changesets.ChangeSetScriptLoader;
import com.github.mongobee.changeset.ChangeLog;
import com.github.mongobee.changeset.ChangeSet;
import org.jongo.Jongo;
import org.jongo.MongoCollection;

import java.io.IOException;

/**
 * Ченджсеты связей для колонок журнала
 */
@ChangeLog(order = "2")
public class ColumnChangeSet {

    private ChangeSetScriptLoader scriptLoader = new ChangeSetScriptLoader();

    @ChangeSet(order = "1"
            , id = "registry_new_column_of_personal_journal_on_first_start"
            , author = "Ivanov Roman"
    )
    public void registryNewColumnOfPersonalJournalOnFirstStart(Jongo database) throws IOException {
        final String scriptPath = "scripts/journal-column/journal-column-on-first-start.json";
        final MongoCollection journalColumnCollection = database.getCollection("journal-column");
        journalColumnCollection.insert(scriptLoader.getDocumentFromResourceByPath(scriptPath));
    }

}
