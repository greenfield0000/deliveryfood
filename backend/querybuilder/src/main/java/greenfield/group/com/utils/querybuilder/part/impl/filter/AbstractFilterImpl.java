package greenfield.group.com.utils.querybuilder.part.impl.filter;

import greenfield.group.com.utils.querybuilder.part.builder.Filter;
import greenfield.group.com.utils.querybuilder.part.types.DatabaseType;
import lombok.Data;

import java.util.List;

/**
 * Абстрактный класс для описания сущности "Фильтр"
 */
@Data
public abstract class AbstractFilterImpl<E extends DatabaseType> implements Filter<E> {

    private E dataBaseType;
    private List<FilterRowItem> filterRowList;

    public E getDataBaseType() {
        return this.dataBaseType;
    }

    public List<FilterRowItem> getFilterRowList() {
        return this.filterRowList;
    }
}
