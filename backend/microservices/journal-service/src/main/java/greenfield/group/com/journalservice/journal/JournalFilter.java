package greenfield.group.com.journalservice.journal;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * Дескриптор фильтрации журнала
 */
@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "journal-Filter")
public class JournalFilter {
    @Id
    private String id;
}
