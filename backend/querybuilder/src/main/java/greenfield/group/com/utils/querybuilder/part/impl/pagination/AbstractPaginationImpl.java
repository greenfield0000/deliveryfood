package greenfield.group.com.utils.querybuilder.part.impl.pagination;

import greenfield.group.com.utils.querybuilder.part.Pagination;
import greenfield.group.com.utils.querybuilder.types.DatabaseType;
import lombok.Data;

/**
 * Описание основных полей для пагинации
 */
@Data
public abstract class AbstractPaginationImpl<E extends DatabaseType> implements Pagination<E> {
    // Текущая страница
    protected int currentRow;
    // Строк всего
    protected int totalRows;

    private E dataBaseType;

    public E getDataBaseType() {
        return this.dataBaseType;
    }
}
