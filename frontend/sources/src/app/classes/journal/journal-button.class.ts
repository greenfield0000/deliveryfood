

interface Button {
    name: string;
    hint: string;
    cssImageName: string;
    handler: (params?: any) => void;
}

/**
 * Описание журнальной кнопки
 */
export class JournalButton implements Button {
    name: string; hint: string;
    cssImageName: string;
    handler: (params?: any) => any;

    private buttonNotImplementedFn: (params?: any) => (void) = function () {
        alert('Button not implemented!!!');
    };

    constructor(data?: any) {
        if (data) {
            this.name = data && data.name || '';
            this.cssImageName = data && data.cssImageName || '';
            this.handler = data && data.handler || this.buttonNotImplementedFn;
        }
    }

}
