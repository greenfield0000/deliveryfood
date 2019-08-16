import { HeaderOutletComponent } from '../outlets/header-outlet/header-outlet.component';
import { MainOutletComponent } from '../outlets/main-outlet/main-outlet.component';
import { FooterOutletComponent } from '../outlets/footer-outlet/footer-outlet.component';

/**
 * Класс-константа для рендера интерфейса
 */
export class OutletChildrenConstant {
    public static OUTLET_CHILDREN = [
        { path: '', component: HeaderOutletComponent, outlet: 'headerOutlet' },
        { path: '', component: MainOutletComponent, outlet: 'mainOutlet' },
        { path: '', component: FooterOutletComponent, outlet: 'footerOutlet' }
    ];
}
