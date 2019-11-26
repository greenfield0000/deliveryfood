package greenfield.group.com.utils.querybuilder;

import greenfield.group.com.utils.querybuilder.part.Filter;
import greenfield.group.com.utils.querybuilder.part.Pagination;
import greenfield.group.com.utils.querybuilder.part.Sorting;
import org.apache.commons.lang3.tuple.MutableTriple;
import org.apache.commons.lang3.tuple.Triple;

public class Main {
    public static void main(String[] args) {

        FilterRequest filterRequest = new FilterRequest();
        Triple<Filter, Pagination, Sorting> block = new MutableTriple<Filter, Pagination, Sorting>();


        // Результат
        StringBuilder builder = new StringBuilder();
        builder.append(block.getLeft().build());
        builder.append(block.getMiddle().build());
        builder.append(block.getRight().build());
        System.out.println(builder.toString());
    }
}
