package greenfield.group.com.utils.querybuilder.part.impl.sorting;

import greenfield.group.com.utils.querybuilder.part.builder.Sorting;
import greenfield.group.com.utils.querybuilder.part.types.DatabaseType;

import java.util.List;

/**
 * Описание поля сортировки
 */
public abstract class AbstractSortingImpl<E extends DatabaseType> implements Sorting<E> {

    private E dataBaseType;
    private List<SortRowItem> sortRowItemList;

    public E getDataBaseType() {
        return this.dataBaseType;
    }

    public List<SortRowItem> getSortRowItemList() {
        return this.sortRowItemList;
    }
}
