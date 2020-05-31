import { OnInit, HostBinding, ViewChild, Injector } from "@angular/core";
import { IJournal } from "src/app/components/journal/journal.interface";
import { JournalComponent } from "src/app/components/journal/journal.component";
import { MenuComponent } from "./menu/menu.component";
import { AppRouteService } from "src/app/services/app-route-service/app-route.service";
import { PersonalService } from "./personal/personal.service";
import { HttpService } from "src/app/services/http-service/http.service";
import { JournalService } from "src/app/services/journal-service/journal.service";
import { ModalWindowService } from "src/app/services/modal-window-service/modal-window.service";

/**
 * Общий абстрактный класс для журналов
 */
export abstract class AbstractJournalMenu<T> implements OnInit, IJournal<T> {

    @HostBinding('class')
    private className = 'form';
    public journalHeader: string = "Журнал позиций";
    @ViewChild('journal') journal: JournalComponent<T>;

    protected _appRouterService: AppRouteService;
    protected _personalService: PersonalService;
    protected _http: HttpService;
    protected _journalService: JournalService;
    protected _modalWindowService: ModalWindowService;

    constructor(protected serviceInjector: Injector) {
        this._appRouterService = this.serviceInjector.get(AppRouteService);
        this._personalService = this.serviceInjector.get(PersonalService);
        this._http = this.serviceInjector.get(HttpService);
        this._journalService = this.serviceInjector.get(JournalService);
        this._modalWindowService = this.serviceInjector.get(ModalWindowService);
    }
    
    abstract getJournalHeader(): string;
    abstract getJournalSysName(): string;
    abstract getComponentContext(): T;

    ngOnInit() {
        this.journal.load(this.getJournalSysName());
    }
}