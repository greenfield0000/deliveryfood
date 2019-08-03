package changesets.journal;

import changesets.ChangeSetScriptLoader;
import com.github.mongobee.changeset.ChangeLog;
import com.github.mongobee.changeset.ChangeSet;
import org.jongo.Jongo;
import org.jongo.MongoCollection;

import java.io.IOException;

/**
 * Ченджсеты мета-информации журнала
 */
@ChangeLog
public class JournalStructureChangeSet {

    private ChangeSetScriptLoader scriptLoader = new ChangeSetScriptLoader();

    @ChangeSet(order = "1", id = "registry_journal_structure_personal", author = "Ivanov Roman")
    public void registryJournalPersonalStructure(Jongo database) throws IOException {
        final String scriptPath = "scripts/journal/personal-journal-structure.json";
        final MongoCollection menuCollection = database.getCollection("journal");
        menuCollection.insert(scriptLoader.getDocumentFromResourceByPath(scriptPath));
    }

}
