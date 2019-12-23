package greenfield.group.com.utils.querybuilder.impl.sorting;

import greenfield.group.com.utils.querybuilder.builder.Sorting;
import greenfield.group.com.utils.querybuilder.builder.types.DataBase;

import java.util.List;

/**
 * Описание поля сортировки
 */
public abstract class AbstractSortingImpl<E extends DataBase> implements Sorting<E> {

    private E DataBase;
    private List<SortRowItem> sortRowItemList;

    public E getDataBase() {
        return this.DataBase;
    }

    public List<SortRowItem> getSortRowItemList() {
        return this.sortRowItemList;
    }
}
