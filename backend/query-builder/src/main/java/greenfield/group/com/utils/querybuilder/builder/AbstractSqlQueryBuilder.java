package greenfield.group.com.utils.querybuilder.builder;

import greenfield.group.com.utils.querybuilder.builder.types.StatementCondition;
import greenfield.group.com.utils.querybuilder.builder.unit.SelectColumn;
import greenfield.group.com.utils.querybuilder.builder.unit.Statement;
import greenfield.group.com.utils.querybuilder.builder.unit.WhereStatement;
import lombok.Data;

import java.util.List;

/**
 * Абстрактный билдер запросов
 */
@Data
public abstract class AbstractSqlQueryBuilder {

    private String tableName;
    // Описание колонок для выбора
    private List<SelectColumn> selectColumnList;
    // Описание условия
    private WhereStatement whereStatement;

    /**
     * Функция построения запроса
     *
     * @return готовый запрос в виде sql
     */
    public String build(List<SelectColumn> selectColumnList, String tableName, WhereStatement whereStatement) throws Exception {
        this.selectColumnList = selectColumnList;
        this.tableName = tableName;
        this.whereStatement = whereStatement;
        return createSql();
    }

    /**
     * Скрипт для построения запроса
     *
     * @return подготовленный скрипт
     */
    private String createSql() throws Exception {
        return selectSql(selectColumnList) +
                fromSql(tableName) +
                whereSql(whereStatement) +
                // Пока не реализовано
                groupBySql() +
                // Пока не реализовано
                orderBySql() +
                // Пока не реализовано
                limitSql();
    }

    protected abstract String selectSql(List<SelectColumn> selectColumnList);

    protected abstract String fromSql(String tableName) throws Exception;

    protected abstract String whereSql(WhereStatement whereStatement);

    protected abstract String groupBySql();

    protected abstract String orderBySql();

    protected abstract String limitSql();

    /**
     * Метод преобразования объекта ограничений в строкоое представление
     *
     * @param whereStatement объект ограничения
     * @param where          строковое представление ограничения
     * @return строковое представление ограничения
     */
    protected String convertWhereStatementToString(WhereStatement whereStatement, StringBuilder where) {
        if (whereStatement == null) {
            return "";
        }

        // первое условие в цепочке
        Statement statement = whereStatement.getStatement();
        String fieldName = statement.getFieldName();
        String conditionName = statement.getCondition().getOperator();
        Object value = statement.getValue().toString();
        where.append("( ")
                .append(fieldName)
                .append(" ")
                .append(conditionName)
                .append(" ")
                .append(value);
        // Если оно как то связано с другими, то свяжем
        List<WhereStatement> otherStatement = whereStatement.getOtherStatement();
        if (!otherStatement.isEmpty()) {
            where.append(" ")
                    .append(whereStatement.getStatementCondition().getOperator());
            int otherStatementSize = otherStatement.size();
            int currentStatement = 0;
            for (WhereStatement s : otherStatement) {
                currentStatement++;
                convertWhereStatementToString(s, where);
                StatementCondition statementCondition = s.getStatementCondition();
                if (statementCondition != null && currentStatement != otherStatementSize) {
                    where.append(statementCondition.getOperator());
                }
            }
        }

        where.append(" )");
        return where.toString();
    }
}
