package documents;

import enums.UserRole;
import helped.menu.Structure;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;


/**
 * Документ - меню. Данный документ предоставляет основную информацию по
 * панель меню.
 */
@Document(collection = "menu")
public class Menu {

    @Id
    private Long id;
    // Описание
    private String note;
    // Системное имя
    private String sysname;
    // Владелец меню
    private List<UserRole> ownerRole;
    // Структура меню
    private Structure structure;

    public Menu() {
    }

    public Menu(Long id, String note, String sysname, List<UserRole> ownerRole, Structure structure) {
        this.id = id;
        this.note = note;
        this.sysname = sysname;
        this.ownerRole = ownerRole;
        this.structure = structure;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public String getSysname() {
        return sysname;
    }

    public void setSysname(String sysname) {
        this.sysname = sysname;
    }

    public List<UserRole> getOwnerRole() {
        return ownerRole;
    }

    public void setOwnerRole(List<UserRole> ownerRole) {
        this.ownerRole = ownerRole;
    }

    public Structure getStructure() {
        return structure;
    }

    public void setStructure(Structure structure) {
        this.structure = structure;
    }

    @Override
    public String toString() {
        return "Menu{" +
                "id=" + id +
                ", note='" + note + '\'' +
                ", sysname='" + sysname + '\'' +
                ", ownerRole=" + ownerRole +
                ", structure=" + structure +
                '}';
    }
}
