package greenfield.group.com.journalservice.model.journal;

import lombok.Data;

import java.util.List;

/**
 * Метаданные журнала
 */
@Data
public class JournalMetadataCommon {
    protected String id;
    private String serviceName = "";
    private String gateName = "";
    private List<JournalButton> buttonList;
    private JournalColumnMetaData columnMetaData;
    private List<Preset> presetList;
}
