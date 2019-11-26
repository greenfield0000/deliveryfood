package greenfield.group.com.utils.querybuilder.part;


import greenfield.group.com.utils.querybuilder.part.impl.filter.FilterRowItem;
import greenfield.group.com.utils.querybuilder.types.DatabaseType;

import java.util.List;

/**
 * Интерфейс фильтрации
 */
public interface Filter<E extends DatabaseType> extends SqlBuild<E> {
    /**
     * Сеттер возвращающий список аттрибутов, по которым требуется фильтраци
     *
     * @return список аттрибутов для фильтрации
     */
    List<FilterRowItem> getFilterRowList();
}
