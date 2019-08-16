interface Button {
    name: string;
    hint: string;
    cssImageName: string;
    handler: (params?: any) => any;
}

/**
 * Описание журнальной кнопки
 */
export class JournalButton implements Button {
    name: string; hint: string;
    cssImageName: string;
    handler: (params?: any) => any;
}
