package greenfield.group.com.journalservice.model.journal;

import lombok.Data;

import java.util.List;
import java.util.Set;

/**
 * Метаданные журнала
 */
@Data
public class JournalMetadataCommonDTO {
    protected String id;
    private String serviceName = "";
    private String gateName = "";
    private Set<JournalButtonDTO> buttonList;
    private JournalColumnMetaDataDTO columnMetaData;
    private List<PresetDTO> presetDTOList;
}
