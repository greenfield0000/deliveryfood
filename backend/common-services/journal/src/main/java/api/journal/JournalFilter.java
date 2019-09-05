package api.journal;

import lombok.*;

/**
 * Дескриптор фильтрации журнала
 */
@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class JournalFilter {
    private String id;
}
