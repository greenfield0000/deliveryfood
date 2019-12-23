package greenfield.group.com.utils.querybuilder;

import greenfield.group.com.utils.querybuilder.builder.Filter;
import greenfield.group.com.utils.querybuilder.builder.Pagination;
import greenfield.group.com.utils.querybuilder.builder.Sorting;
import lombok.Data;

/**
 * Основной запрос, который может прийти из интерфейса
 */
@Data
public class SqlRequest {
    private Filter filter;
    private Pagination pagination;
    private Sorting sorting;
}
