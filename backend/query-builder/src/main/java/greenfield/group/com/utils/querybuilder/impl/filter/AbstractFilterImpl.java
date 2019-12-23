package greenfield.group.com.utils.querybuilder.impl.filter;

import greenfield.group.com.utils.querybuilder.builder.Filter;
import greenfield.group.com.utils.querybuilder.builder.types.DataBase;
import lombok.Data;

import java.util.List;

/**
 * Абстрактный класс для описания сущности "Фильтр"
 */
@Data
public abstract class AbstractFilterImpl<E extends DataBase> implements Filter<E> {

    private E DataBase;
    private List<FilterRowItem> filterRowList;

    public E getDataBase() {
        return this.DataBase;
    }

    public List<FilterRowItem> getFilterRowList() {
        return this.filterRowList;
    }
}
