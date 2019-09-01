import { IDialogType } from './idialog.type';

/**
 * Интерфейс предназначен для связывания компонентов
 * диалогового окна с сервисом
 */
export interface IDialog {
    type: IDialogType;
}
