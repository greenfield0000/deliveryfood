package migrations;

import com.github.mongobee.Mongobee;

import java.util.ArrayList;
import java.util.List;

/**
 * Конфигурация для выполнения миграции
 */
public class MongoConfiguration {

    private List<Mongobee> mongobeeList;

    public MongoConfiguration(List<Mongobee> mongobeeList) {
        this.mongobeeList = mongobeeList;
    }

    public void addMongoBee(Mongobee mongobee) {
        if (mongobeeList == null) {
            mongobeeList = new ArrayList<>();
        }

        if (!mongobeeList.contains(mongobee)) {
            mongobeeList.add(mongobee);
        }
    }

    public List<Mongobee> getMongobeeList() {
        return mongobeeList;
    }


}
