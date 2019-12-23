package greenfield.group.com.utils.querybuilder;

import greenfield.group.com.utils.querybuilder.builder.impl.MySqlBuilder;
import greenfield.group.com.utils.querybuilder.builder.types.StatementCondition;
import greenfield.group.com.utils.querybuilder.builder.types.ValueCondition;
import greenfield.group.com.utils.querybuilder.builder.unit.Statement;
import greenfield.group.com.utils.querybuilder.builder.unit.WhereStatement;

import java.util.ArrayList;

public class Main {
    public static void main(String[] args) throws Exception {

        // Вложенное ограничение
        WhereStatement innerWhereStatement = new WhereStatement();
        // Добавим простое условие
        Statement statement2 = new Statement();
        statement2.setFieldName("Тестовое поле 2");
        statement2.setCondition(ValueCondition.EQUALS);
        statement2.setValue("Тестовое значение 2");

        innerWhereStatement.setStatement(statement2);
        innerWhereStatement.setStatementCondition(StatementCondition.AND);
        innerWhereStatement.addStatement(statement2, StatementCondition.OR);

        MySqlBuilder mySqlBuilder = new MySqlBuilder();
        WhereStatement whereStatement = new WhereStatement();
        // Добавим простое условие
        Statement statement = new Statement();
        statement.setFieldName("Тестовое поле");
        statement.setCondition(ValueCondition.GREATER_THAN);
        statement.setValue("Тестовое значение");

        whereStatement.setStatement(statement);
        whereStatement.setStatementCondition(StatementCondition.AND);
        // Добавим ограничение, которое связана по "И"
        whereStatement.addStatement(statement, StatementCondition.AND)
                .addStatement(statement, StatementCondition.AND)
//                // Добавим вложенное ограничение
                .addStatement(innerWhereStatement, StatementCondition.OR);


//        System.out.println(mySqlBuilder.testWhere(whereStatement));
        System.out.println(mySqlBuilder
                .build(new ArrayList<>(), "Тестовая таблица", whereStatement));

    }
}
