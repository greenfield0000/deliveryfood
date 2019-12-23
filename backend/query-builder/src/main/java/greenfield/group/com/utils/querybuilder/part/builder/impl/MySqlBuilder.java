package greenfield.group.com.utils.querybuilder.part.builder.impl;

import greenfield.group.com.utils.querybuilder.part.builder.AbstractSqlQueryBuilder;

/**
 * Класс имплементатор для построения запроса для БД MySql
 */
public class MySqlBuilder extends AbstractSqlQueryBuilder {

    @Override
    protected String selectSql() {
        return null;
    }

    @Override
    protected String fromSql(String tableName) {
        return null;
    }

    @Override
    protected String whereSql() {
        return null;
    }

    @Override
    protected String groupBySql() {
        return null;
    }

    @Override
    protected String orderBySql() {
        return null;
    }

    @Override
    protected String limitSql() {
        return null;
    }
}
