package documents;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import types.JournalButtonType;


/**
 * Кнопки журнала
 */
@Document
public class JournalButton {
    @Id
    private Long id;
    private String sysName;
    private String note;
    private JournalButtonType type = JournalButtonType.DEFAULT;

    public JournalButton() {
    }

    public JournalButton(Long id, String sysName, String note, JournalButtonType type) {
        this.id = id;
        this.sysName = sysName;
        this.note = note;
        this.type = type;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSysName() {
        return sysName;
    }

    public void setSysName(String sysName) {
        this.sysName = sysName;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public JournalButtonType getType() {
        return type;
    }

    public void setType(JournalButtonType type) {
        this.type = type;
    }

    @Override
    public String toString() {
        return "JournalButton{" +
                "id=" + id +
                ", sysName='" + sysName + '\'' +
                ", note='" + note + '\'' +
                ", type=" + type +
                '}';
    }
}
