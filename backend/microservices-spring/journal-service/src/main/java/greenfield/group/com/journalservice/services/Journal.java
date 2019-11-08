package greenfield.group.com.journalservice.services;

import greenfield.group.com.journalservice.model.journal.JournalData;
import greenfield.group.com.journalservice.model.journal.JournalFilterItem;
import greenfield.group.com.journalservice.model.journal.JournalMetadataCommon;
import greenfield.group.com.journalservice.model.journal.Preset;

import java.util.List;

/**
 * Сервис журнала
 */
public interface Journal {
    /**
     * Загрузка журнала согласно параметрам
     *
     * @param sysName системное имя журнала
     * @return
     */
    JournalMetadataCommon metaDataLoadJournal(String sysName);

    /**
     * Общая загрузка данных журнала по системному имени
     *
     * @param sysName    системное имя журнала
     * @param pageNumber номер страницы
     * @return возвращает данные журнала
     */
    JournalData loadJournalData(String sysName, int pageNumber);

    /**
     * Метод фильтрации данных
     *
     * @param journalSysName        системное имя журнала
     * @param journalFilterItemList список фильтров
     * @return
     */
    JournalData doFilter(String journalSysName, List<JournalFilterItem> journalFilterItemList);

    /**
     * Метод сохранения пресета
     *
     * @param preset новый пресет
     * @return
     */
    List<Preset> savePreset(Preset preset);

    /**
     * Вызов обработчика кнопки
     *
     * @param journalSysName системное имя журнала, для которого вызывается кнопка
     * @param buttonAction   системное имя кнопки
     * @param pageNumber     страница, на которой остановился пользователь (нужна для возврата на нее после
     *                       выполнения действия)
     * @return данные журнала на странице pageNumber
     */
    JournalData doButtonHandler(String journalSysName, String buttonAction, int pageNumber);
}
