package changesets.journal.buttons;

import changesets.ChangeSetScriptLoader;
import com.github.mongobee.changeset.ChangeLog;
import com.github.mongobee.changeset.ChangeSet;
import org.jongo.Jongo;
import org.jongo.MongoCollection;

import java.io.IOException;

/**
 * Ченджсеты связей для структуры журнала
 */
@ChangeLog(order = "1")
public class JournalButtonsChangeSet {
    private ChangeSetScriptLoader scriptLoader = new ChangeSetScriptLoader();

    @ChangeSet(order = "1"
            , id = "registry_new_button_create_on_first_start"
            , author = "Ivanov Roman"
    )
    public void registryNewButtonCreateOnFirstStart(Jongo database) throws IOException {
        final String scriptPath = "scripts/journal-button/journal-button-after-first-start-create.json";
        final MongoCollection journalButtonsCollection = database.getCollection("journal-button");
        journalButtonsCollection.insert(scriptLoader.getDocumentFromResourceByPath(scriptPath));
    }

    @ChangeSet(order = "2"
            , id = "registry_new_button_edit_on_first_start"
            , author = "Ivanov Roman"
    )
    public void registryNewButtonEditOnFirstStart(Jongo database) throws IOException {
        final String scriptPath = "scripts/journal-button/journal-button-after-first-start-edit.json";
        final MongoCollection journalButtonsCollection = database.getCollection("journal-button");
        journalButtonsCollection.insert(scriptLoader.getDocumentFromResourceByPath(scriptPath));
    }

    @ChangeSet(order = "3"
            , id = "registry_new_button_delete_on_first_start"
            , author = "Ivanov Roman"
    )
    public void registryNewButtonDeleteOnFirstStart(Jongo database) throws IOException {
        final String scriptPath = "scripts/journal-button/journal-button-after-first-start-delete.json";
        final MongoCollection journalButtonsCollection = database.getCollection("journal-button");
        journalButtonsCollection.insert(scriptLoader.getDocumentFromResourceByPath(scriptPath));
    }

}
