package changesets.menu;

import changesets.ChangeSetScriptLoader;
import com.github.mongobee.changeset.ChangeLog;
import com.github.mongobee.changeset.ChangeSet;
import org.jongo.Jongo;
import org.jongo.MongoCollection;

import java.io.IOException;

/**
 * Набор ченджсетов для вставок, удаления, обновления, изменение структуры в коллекции "Меню"
 */
@ChangeLog
public class MenuChangeSet {

    private ChangeSetScriptLoader scriptLoader = new ChangeSetScriptLoader();

    @ChangeSet(order = "1", id = "registry_menu_on_start", author = "Ivanov Roman")
    public void registryMenuOnStart(Jongo database) throws IOException {
        final String scriptPath = "scripts/menu.json";
        final MongoCollection menuCollection = database.getCollection("menu");
        menuCollection.insert(scriptLoader.getDocumentFromResourceByPath(scriptPath));

    }


}
