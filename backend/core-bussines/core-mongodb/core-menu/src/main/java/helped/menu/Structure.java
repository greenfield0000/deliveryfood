package helped.menu;

import java.util.List;

/**
 * Описание единицы меню
 */
public class Structure extends StructureInfo {
    private List<Structure> children;
    private String name;
    private String type;

    public Structure() {
    }

    public Structure(List<Structure> children, String name, String type) {
        this.children = children;
        this.name = name;
        this.type = type;
    }

    public List<Structure> getChildren() {
        return children;
    }

    public void setChildren(List<Structure> children) {
        this.children = children;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    @Override
    public String toString() {
        return "Structure{" +
                "children=" + children +
                ", name='" + name + '\'' +
                ", type='" + type + '\'' +
                '}';
    }
}
