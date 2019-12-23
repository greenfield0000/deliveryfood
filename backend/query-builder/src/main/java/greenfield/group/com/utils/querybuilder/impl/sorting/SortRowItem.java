package greenfield.group.com.utils.querybuilder.impl.sorting;

import greenfield.group.com.utils.querybuilder.builder.types.Sort;
import lombok.Data;

/**
 * Единица сортировки. Необхожим для сортировки списка аттрибутов
 */
@Data
public class SortRowItem {
    private Sort sortType;
    private String fieldName;
}
