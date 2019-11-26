package greenfield.group.com.utils.querybuilder.part;

/**
 * Интерфейс построения встроенного sql
 */
interface SqlBuild<E> {
    String build();

    E getDataBaseType();
}
