package greenfield.group.com.utils.querybuilder.part.builder;

import greenfield.group.com.utils.querybuilder.part.impl.sorting.SortRowItem;
import greenfield.group.com.utils.querybuilder.part.types.DatabaseType;

import java.util.List;

/**
 * Интерфейс сортировки
 */
public interface Sorting<E extends DatabaseType> {
    List<SortRowItem> getSortRowItemList();
}
