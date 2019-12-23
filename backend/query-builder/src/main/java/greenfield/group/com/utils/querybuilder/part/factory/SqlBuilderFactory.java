package greenfield.group.com.utils.querybuilder.part.factory;

import greenfield.group.com.utils.querybuilder.part.builder.AbstractSqlQueryBuilder;
import greenfield.group.com.utils.querybuilder.part.builder.impl.MySqlBuilder;
import greenfield.group.com.utils.querybuilder.part.factory.exception.SqlBuilderFactoryException;
import greenfield.group.com.utils.querybuilder.part.types.DatabaseType;

/**
 * Фабрика по созданию билдеров в соответствии с типом БД,
 * который описан {@link greenfield.group.com.utils.querybuilder.part.types.DatabaseType}
 */
public class SqlBuilderFactory {

    public static AbstractSqlQueryBuilder build(DatabaseType databaseType) {
        AbstractSqlQueryBuilder sqlBuilder = null;

        switch (databaseType) {
            case MYSQL: {
                sqlBuilder = new MySqlBuilder();
                break;
            }
            case POSTGRES: {
                sqlBuilder = new PostgresSqlBuilder();
                break;
            }
            case ORACLE: {
                sqlBuilder = new OracleSqlBuilder();
                break;
            }
        }

        if (databaseType == null || sqlBuilder == null) {
            throw new SqlBuilderFactoryException("Не удалось определить тип билдера в соответствии с " +
                    "типом");
        }
        return sqlBuilder;
    }

}
