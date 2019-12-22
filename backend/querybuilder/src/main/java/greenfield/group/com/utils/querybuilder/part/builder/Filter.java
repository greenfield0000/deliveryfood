package greenfield.group.com.utils.querybuilder.part.builder;


import greenfield.group.com.utils.querybuilder.part.impl.filter.FilterRowItem;
import greenfield.group.com.utils.querybuilder.part.types.DatabaseType;

import java.util.List;

/**
 * Интерфейс фильтрации
 */
public interface Filter<E extends DatabaseType> {
    /**
     * Сеттер возвращающий список аттрибутов, по которым требуется фильтраци
     *
     * @return список аттрибутов для фильтрации
     */
    List<FilterRowItem> getFilterRowList();
}
