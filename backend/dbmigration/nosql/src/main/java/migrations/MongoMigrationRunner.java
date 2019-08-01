package migrations;

import com.github.mongobee.Mongobee;
import com.github.mongobee.exception.MongobeeException;
import exceptions.MongoCMigrationRunnerException;

import java.util.List;

public class MongoMigrationRunner {
    private static MongoConfiguration configurationForRun;

    public static void run(MongoConfiguration configuration) throws MongoCMigrationRunnerException, MongobeeException {
        if (configuration == null || configuration.getMongobeeList() == null) {
            throw new MongoCMigrationRunnerException("Run impposible. Configuration is missed");
        }
        configurationForRun = configuration;

        for (Mongobee mongobee : configuration.getMongobeeList()) {
            mongobee.execute();
        }
    }

    public static void stop() {
        if (configurationForRun != null) {
            final List<Mongobee> mongobeeList = configurationForRun.getMongobeeList();
            if (mongobeeList != null) {
                mongobeeList.forEach(Mongobee::close);
            }
        }
    }
}
