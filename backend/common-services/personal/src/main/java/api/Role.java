package api;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import javax.persistence.*;

/**
 * Роли для аккаунта
 */
@Data
@Entity
@Table(name = "AccountRole")
@JsonIgnoreProperties(ignoreUnknown = true)
public class Role extends BaseEntity {
    @Column(name = "name")
    private String name;
    @Column(name = "sysname")
    private String sysname;
}
