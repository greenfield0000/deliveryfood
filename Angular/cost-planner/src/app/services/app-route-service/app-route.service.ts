import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AppRouteService {

  constructor(private _router: Router,
    private route: ActivatedRoute) { }

  /**
   * Перейти по имени пути
   */
  public goTo(urlName: string, params?: any) {
    if (urlName && urlName.length > 0) {
      this._router.navigateByUrl(urlName)  // , { relativeTo: this.route }
        .catch((reson: any) => console.log('Неверный url. Error = ', reson));
    }
  }
}
