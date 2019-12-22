package greenfield.group.com.utils.querybuilder.part.impl.sorting;

import greenfield.group.com.utils.querybuilder.part.types.SortType;
import lombok.Data;

/**
 * Единица сортировки. Необхожим для сортировки списка аттрибутов
 */
@Data
public class SortRowItem {
    private SortType sortType;
    private String fieldName;
}
