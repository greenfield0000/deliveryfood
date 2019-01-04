package helped.menu;


/**
 * Кратская информацию единицы меню
 */
public class StructureInfo {
    // Возможность расхлапываться
    protected boolean expandable;
    // уровень вложенности
    protected long level;

    public StructureInfo() {
    }

    public StructureInfo(boolean expandable, long level) {
        this.expandable = expandable;
        this.level = level;
    }

    public boolean isExpandable() {
        return expandable;
    }

    public void setExpandable(boolean expandable) {
        this.expandable = expandable;
    }

    public long getLevel() {
        return level;
    }

    public void setLevel(long level) {
        this.level = level;
    }

    @Override
    public String toString() {
        return "StructureInfo{" +
                "expandable=" + expandable +
                ", level=" + level +
                '}';
    }
}
