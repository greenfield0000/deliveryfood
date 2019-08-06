package greenfield.group.com.journalservice.journal;

/**
 * Класс-описатель журнальной кнопки
 */
public class JournalButton {
    private String name;
    private String hint;
    private String cssImageName;
    private String handlerFnName;

    public JournalButton() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getHint() {
        return hint;
    }

    public void setHint(String hint) {
        this.hint = hint;
    }

    public String getCssImageName() {
        return cssImageName;
    }

    public void setCssImageName(String cssImageName) {
        this.cssImageName = cssImageName;
    }

    public String getHandlerFnName() {
        return handlerFnName;
    }

    public void setHandlerFnName(String handlerFnName) {
        this.handlerFnName = handlerFnName;
    }
}
