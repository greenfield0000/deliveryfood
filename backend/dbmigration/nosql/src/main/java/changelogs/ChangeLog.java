package changelogs;

import com.github.mongobee.Mongobee;
import com.github.mongobee.exception.MongobeeException;
import exceptions.MongoCMigrationRunnerException;
import migrations.MongoConfiguration;
import migrations.MongoMigrationRunner;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Collections;
import java.util.List;


/**
 * Стартовый ченджлог для основного запуска
 */
public class ChangeLog {

    private final static Logger logger = LoggerFactory.getLogger("ChangeLogLogger");

    public static void main(String[] args) {
        // Мигрант для пунктов меню
        Mongobee menuRunner = new Mongobee("mongodb://localhost:27017/metadata-db");
        menuRunner.setChangeLogsScanPackage("changesets"); // package to scan for changesets
        List<Mongobee> mongobeeList = Collections.singletonList(menuRunner);
        MongoConfiguration configuration = new MongoConfiguration(mongobeeList);
        try {
            MongoMigrationRunner.run(configuration);
        } catch (MongobeeException | MongoCMigrationRunnerException e) {
            logger.error(String.format("While executed was erised exception = %s", e));
        } finally {
            MongoMigrationRunner.stop();
        }
    }
}
