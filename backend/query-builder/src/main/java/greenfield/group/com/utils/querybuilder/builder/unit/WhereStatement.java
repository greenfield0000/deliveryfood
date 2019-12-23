package greenfield.group.com.utils.querybuilder.builder.unit;

import greenfield.group.com.utils.querybuilder.builder.exception.WhereStatementException;
import greenfield.group.com.utils.querybuilder.builder.types.StatementCondition;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

/**
 * Дерево ограничений для запроса
 */
@Data
@Getter
@Setter
public class WhereStatement {
    // Текущее ограничение может быть связано со списком других ограничений
    private List<WhereStatement> otherStatement = new ArrayList<>();
    private StatementCondition statementCondition;
    // Выражение текущего ограничения
    private Statement statement;

    /**
     * Метод для добавления нового ограничения
     *
     * @param statement выражение
     * @return ссылка на самого себя
     */
    public WhereStatement addStatement(Statement statement, StatementCondition condition) throws WhereStatementException {
        if (condition == null) {
            throw new WhereStatementException("Не удалось добавить ограничение!");
        }
        if (statement != null) {
            if (otherStatement == null) {
                otherStatement = new ArrayList<>();
            }

            // Добавим само ограничение
            WhereStatement whereStatement = new WhereStatement();
            whereStatement.setStatement(statement);
            whereStatement.setStatementCondition(condition);
            otherStatement.add(whereStatement);
        }
        return this;
    }

    /**
     * Метод для добавления нового внутреннего ограничения
     *
     * @param whereStatement вложенное выражение
     * @return ссылка на самого себя
     */
    public WhereStatement addStatement(WhereStatement whereStatement, StatementCondition condition) throws WhereStatementException {
        if (condition == null) {
            throw new WhereStatementException("Не удалось добавить ограничение!");
        }
        if (statement != null) {
            if (otherStatement == null) {
                otherStatement = new ArrayList<>();
            }
            whereStatement.setStatementCondition(condition);
            otherStatement.add(whereStatement);
        }
        return this;
    }
}
