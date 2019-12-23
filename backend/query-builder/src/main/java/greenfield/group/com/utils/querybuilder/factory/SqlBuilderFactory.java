package greenfield.group.com.utils.querybuilder.factory;

/**
 * Фабрика по созданию билдеров в соответствии с типом БД,
 * который описан {@link greenfield.group.com.utils.querybuilder.builder.types.Database}
 */
public class SqlBuilderFactory {

//    public static AbstractSqlQueryBuilder build(Database DataBase) {
//        AbstractSqlQueryBuilder sqlBuilder = null;
//
//        switch (DataBase) {
//            case MYSQL: {
//                sqlBuilder = new MySqlBuilder();
//                break;
//            }
//            case POSTGRES: {
//                sqlBuilder = new PostgresSqlBuilder();
//                break;
//            }
//            case ORACLE: {
//                sqlBuilder = new OracleSqlBuilder();
//                break;
//            }
//        }
//
//        if (DataBase == null || sqlBuilder == null) {
//            throw new SqlBuilderFactoryException("Не удалось определить тип билдера в соответствии с " +
//                    "типом");
//        }
//        return sqlBuilder;
//    }

}
