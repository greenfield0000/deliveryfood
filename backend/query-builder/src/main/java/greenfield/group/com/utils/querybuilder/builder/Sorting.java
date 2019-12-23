package greenfield.group.com.utils.querybuilder.builder;

import greenfield.group.com.utils.querybuilder.builder.types.DataBase;
import greenfield.group.com.utils.querybuilder.impl.sorting.SortRowItem;

import java.util.List;

/**
 * Интерфейс сортировки
 */
public interface Sorting<E extends DataBase> {
    List<SortRowItem> getSortRowItemList();
}
