package greenfield.group.com.utils.querybuilder.part.builder;

import lombok.Data;

/**
 * Абстрактный билдер запросов
 */
@Data
public abstract class AbstractSqlQueryBuilder {

    private String tableName;

    /**
     * Функция построения запроса
     *
     * @return готовый запрос в виде sql
     */
    protected String build(String tableName) {
        this.tableName = tableName;
        return createSql();
    }

    /**
     * Скрипт для построения запроса
     *
     * @return подготовленный скрипт
     */
    private String createSql() {
        return selectSql() +
                fromSql(this.tableName) +
                whereSql() +
                groupBySql() +
                orderBySql() +
                limitSql();
    }

    abstract String selectSql();

    abstract String fromSql(String tableName);

    abstract String whereSql();

    abstract String groupBySql();

    abstract String orderBySql();

    abstract String limitSql();

//    private String selectSql() {
//        List<String> selectCols;
//        if (isPivotMode && !pivotColumns.isEmpty()) {
//            selectCols = concat(rowGroupsToInclude.stream(), extractPivotStatements()).collect(toList());
//        } else {
//            Stream<String> valueCols = valueColumns.stream()
//                    .map(valueCol -> valueCol.getAggFunc() + '(' + valueCol.getField() + ") as " + valueCol.getField());
//
//            selectCols = concat(rowGroupsToInclude.stream(), valueCols).collect(toList());
//        }
//
//        return isGrouping ? "SELECT " + join(", ", selectCols) : "SELECT *";
//    }
//
//    private String fromSql(String tableName) {
//        return format(" FROM %s", tableName);
//    }
//
//    private String whereSql() {
//        String whereFilters =
//                concat(getGroupColumns(), getFilters())
//                        .collect(joining(" AND "));
//
//        return whereFilters.isEmpty() ? "" : format(" WHERE %s", whereFilters);
//    }
//
//    private String groupBySql() {
//        return isGrouping ? " GROUP BY " + join(", ", rowGroupsToInclude) : "";
//    }
//
//    private String orderBySql() {
//        Function<SortModel, String> orderByMapper = model -> model.getColId() + " " + model.getSort();
//
//        boolean isDoingGrouping = rowGroups.size() > groupKeys.size();
//        int num = isDoingGrouping ? groupKeys.size() + 1 : MAX_VALUE;
//
//        List<String> orderByCols = sortModel.stream()
//                .filter(model -> !isDoingGrouping || rowGroups.contains(model.getColId()))
//                .map(orderByMapper)
//                .limit(num)
//                .collect(toList());
//
//        return orderByCols.isEmpty() ? "" : " ORDER BY " + join(",", orderByCols);
//    }
//
//    private String limitSql() {
//        return " OFFSET " + startRow + " ROWS FETCH NEXT " + (endRow - startRow + 1) + " ROWS ONLY";
//    }
//
//    private Stream<String> getFilters() {
//        Function<Map.Entry<String, ColumnFilter>, String> applyFilters = entry -> {
//            String columnName = entry.getKey();
//            ColumnFilter filter = entry.getValue();
//
//            if (filter instanceof SetColumnFilter) {
//                return setFilter().apply(columnName, (SetColumnFilter) filter);
//            }
//
//            if (filter instanceof NumberColumnFilter) {
//                return numberFilter().apply(columnName, (NumberColumnFilter) filter);
//            }
//
//            return "";
//        };
//
//        return filterModel.entrySet().stream().map(applyFilters);
//    }
//
//    private BiFunction<String, SetColumnFilter, String> setFilter() {
//        return (String columnName, SetColumnFilter filter) ->
//                columnName + (filter.getValues().isEmpty() ? " IN ('') " : " IN " + asString(filter.getValues()));
//    }
//
//    private BiFunction<String, NumberColumnFilter, String> numberFilter() {
//        return (String columnName, NumberColumnFilter filter) -> {
//            Integer filterValue = filter.getFilter();
//            String filerType = filter.getType();
//            String operator = operatorMap.get(filerType);
//
//            return columnName + (filerType.equals("inRange") ?
//                    " BETWEEN " + filterValue + " AND " + filter.getFilterTo() : " " + operator + " " + filterValue);
//        };
//    }
//
//    private Stream<String> extractPivotStatements() {
//
//        // create pairs of pivot col and pivot value i.e. (DEALTYPE,Financial), (BIDTYPE,Sell)...
//        List<Set<Pair<String, String>>> pivotPairs = pivotValues.entrySet().stream()
//                .map(e -> e.getValue().stream()
//                        .map(pivotValue -> Pair.of(e.getKey(), pivotValue))
//                        .collect(toCollection(LinkedHashSet::new)))
//                .collect(toList());
//
//        // create a cartesian product of decode statements for all pivot and value columns combinations
//        // i.e. sum(DECODE(DEALTYPE, 'Financial', DECODE(BIDTYPE, 'Sell', CURRENTVALUE)))
//        return Sets.cartesianProduct(pivotPairs)
//                .stream()
//                .flatMap(pairs -> {
//                    String pivotColStr = pairs.stream()
//                            .map(Pair::getRight)
//                            .collect(joining("_"));
//
//                    String decodeStr = pairs.stream()
//                            .map(pair -> "DECODE(" + pair.getLeft() + ", '" + pair.getRight() + "'")
//                            .collect(joining(", "));
//
//                    String closingBrackets = IntStream
//                            .range(0, pairs.size() + 1)
//                            .mapToObj(i -> ")")
//                            .collect(joining(""));
//
//                    return valueColumns.stream()
//                            .map(valueCol -> valueCol.getAggFunc() + "(" + decodeStr + ", " + valueCol.getField() +
//                                    closingBrackets + " \"" + pivotColStr + "_" + valueCol.getField() + "\"");
//                });
//    }
//
//    private List<String> getRowGroupsToInclude() {
//        return rowGroups.stream()
//                .limit(groupKeys.size() + 1)
//                .collect(toList());
//    }
//
//    private Stream<String> getGroupColumns() {
//        return zip(groupKeys.stream(), rowGroups.stream(), (key, group) -> group + " = '" + key + "'");
//    }
//
//    private List<String> getRowGroups() {
//        return rowGroupCols.stream()
//                .map(ColumnVO::getField)
//                .collect(toList());
//    }
//
//    private String asString(List<String> l) {
//        return "(" + l.stream().map(s -> "\'" + s + "\'").collect(joining(", ")) + ")";
//    }
//

}
