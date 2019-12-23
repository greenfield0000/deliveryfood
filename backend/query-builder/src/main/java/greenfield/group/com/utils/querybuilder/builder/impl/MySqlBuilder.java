package greenfield.group.com.utils.querybuilder.builder.impl;

import greenfield.group.com.utils.querybuilder.builder.AbstractSqlQueryBuilder;
import greenfield.group.com.utils.querybuilder.builder.exception.MySqlBuilderException;
import greenfield.group.com.utils.querybuilder.builder.unit.SelectColumn;
import greenfield.group.com.utils.querybuilder.builder.unit.WhereStatement;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Класс имплементатор для построения запроса для БД MySql
 */
public class MySqlBuilder extends AbstractSqlQueryBuilder {

    @Override
    protected String selectSql(List<SelectColumn> selectColumnList) {
        String selectQuery = "SELECT";
        if (selectColumnList == null || selectColumnList.isEmpty()) {
            return selectQuery + " * ";
        }
        return selectQuery + " " + selectColumnList.stream()
                .map(SelectColumn::getName)
                .collect(Collectors.joining(" , "));
    }

    @Override
    protected String fromSql(String tableName) throws Exception {
        if (tableName == null || tableName.isEmpty()) {
            throw new MySqlBuilderException("Не указана имя таблицы!");
        }
        return "FROM " + tableName;
    }

    @Override
    protected String whereSql(WhereStatement whereStatement) {
        // Если условия не переданы, то ничего не ограничивае
        if (whereStatement == null) {
            return "";
        }

        StringBuilder where = new StringBuilder();
        where.append(" \n WHERE ");
        return convertWhereStatementToString(whereStatement, where);
    }

    // TODO удалить после всех проверок
    public String testWhere(WhereStatement whereStatement) {
        return whereSql(whereStatement);
    }

    @Override
    protected String groupBySql() {
        return "";
    }

    @Override
    protected String orderBySql() {
        return "";
    }

    @Override
    protected String limitSql() {
        return "";
    }
}
