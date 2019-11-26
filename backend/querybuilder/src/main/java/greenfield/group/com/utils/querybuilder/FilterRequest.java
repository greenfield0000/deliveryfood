package greenfield.group.com.utils.querybuilder;

import greenfield.group.com.utils.querybuilder.part.Filter;
import greenfield.group.com.utils.querybuilder.part.Pagination;
import greenfield.group.com.utils.querybuilder.part.Sorting;
import lombok.Data;
import org.apache.commons.lang3.tuple.Triple;

/**
 * Основной запрос, который может прийти из интерфейса
 */
@Data
public class FilterRequest {
    Triple<Filter, Pagination, Sorting> block;
}
