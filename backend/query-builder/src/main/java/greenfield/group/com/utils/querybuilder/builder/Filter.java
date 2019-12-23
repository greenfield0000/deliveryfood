package greenfield.group.com.utils.querybuilder.builder;


import greenfield.group.com.utils.querybuilder.builder.types.DataBase;
import greenfield.group.com.utils.querybuilder.impl.filter.FilterRowItem;

import java.util.List;

/**
 * Интерфейс фильтрации
 */
public interface Filter<E extends DataBase> {
    /**
     * Сеттер возвращающий список аттрибутов, по которым требуется фильтраци
     *
     * @return список аттрибутов для фильтрации
     */
    List<FilterRowItem> getFilterRowList();
}
