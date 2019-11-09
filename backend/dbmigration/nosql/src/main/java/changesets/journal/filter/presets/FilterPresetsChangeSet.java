package changesets.journal.filter.presets;

import changesets.ChangeSetScriptLoader;
import com.github.mongobee.changeset.ChangeLog;
import com.github.mongobee.changeset.ChangeSet;
import org.jongo.Jongo;
import org.jongo.MongoCollection;

import java.io.IOException;

/**
 * Ченджсеты связей пресетов с фильтрами
 */
@ChangeLog(order = "3")
public class FilterPresetsChangeSet {
    private ChangeSetScriptLoader scriptLoader = new ChangeSetScriptLoader();

    @ChangeSet(order = "1"
            , id = "registry_presets_4_journal_personal"
            , author = "Ivanov Roman"
    )
    public void registryPresets4JournalPersonal(Jongo database) throws IOException {
        final String scriptPath = "scripts/journal-preset/journal-preset-4-personal.json";
        final MongoCollection journalButtonsCollection = database.getCollection("journal-preset");
        journalButtonsCollection.insert(scriptLoader.getDocumentFromResourceByPath(scriptPath));
    }
}
