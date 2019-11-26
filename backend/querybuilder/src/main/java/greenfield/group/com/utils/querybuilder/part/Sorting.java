package greenfield.group.com.utils.querybuilder.part;

import greenfield.group.com.utils.querybuilder.part.impl.sorting.SortRowItem;
import greenfield.group.com.utils.querybuilder.types.DatabaseType;

import java.util.List;

/**
 * Интерфейс сортировки
 */
public interface Sorting<E extends DatabaseType> extends SqlBuild<E> {
    List<SortRowItem> getSortRowItemList();
}
