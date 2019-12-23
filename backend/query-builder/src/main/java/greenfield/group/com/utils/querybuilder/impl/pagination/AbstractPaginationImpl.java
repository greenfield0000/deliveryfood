package greenfield.group.com.utils.querybuilder.impl.pagination;

import greenfield.group.com.utils.querybuilder.builder.Pagination;
import greenfield.group.com.utils.querybuilder.builder.types.DataBase;
import lombok.Data;

/**
 * Описание основных полей для пагинации
 */
@Data
public abstract class AbstractPaginationImpl<E extends DataBase> implements Pagination<E> {
    // Текущая страница
    protected int currentRow;
    // Строк всего
    protected int totalRows;
}
