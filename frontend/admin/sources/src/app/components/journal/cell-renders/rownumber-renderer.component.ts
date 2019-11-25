import { ICellRendererAngularComp } from "ag-grid-angular";
import { Component } from "@angular/core";


/**
 * Отрисовщик для порядкого номера сетки данных. Показывает текущее положение в сетке данных
 */
@Component({
    selector: 'rownumber-cell',
    template: `{{getRowNuber()}}`
})
export class RowNumberRenderer implements ICellRendererAngularComp {
    private rowNumber: number = 0;

    refresh(params: any): boolean {
        this.rowNumber = params.data.id;
        return true;
    }
    agInit(params: import("ag-grid-community").ICellRendererParams): void {
        this.rowNumber++;
    }
    afterGuiAttached?(params?: import("ag-grid-community").IAfterGuiAttachedParams): void {
        throw new Error("Method not implemented.");
    }

    getRowNuber() {
        return this.rowNumber;
    }

}