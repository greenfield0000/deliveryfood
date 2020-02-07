import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AppAccountContextService } from './../app-account-context-service/app-account-context.service';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MenuNode } from 'src/app/classes/menu-node';
import { SimpleResult } from 'src/app/utils/simple-result.class';

/**
 * File database, it can build a tree structured Json object from string.
 * Each node in Json object represents a file or a directory. For a file, it has filename and type.
 * For a directory, it has filename and children (a list of files or directories).
 * The input will be a json object string, and the output is a list of `MenuNode` with nested
 * structure.
 */
@Injectable({
  providedIn: 'root'
})
export class MenuService {

  dataChange = new BehaviorSubject<MenuNode[]>([]);

  get data(): MenuNode[] { return this.dataChange.value; }

  constructor(private http: HttpClient, private accountService: AppAccountContextService) {
//    this.initialize();
  }

  loadMenu(): Observable<SimpleResult<string>> {
    return this.http
      .get<SimpleResult<string>>(environment.gatePath.menu_location + '/getMenu');
  }

  initialize() {
    const isAuthtorised: boolean = this.accountService.isAuthtorised() || false;
    if (isAuthtorised) {
      this.loadMenu()
        .subscribe((simpleResult: SimpleResult<string>) => {
          const menu = simpleResult && simpleResult.result || null;
          if (menu) {
            const parsedMenu = JSON.parse(menu);
            // Notify the change.
            this.dataChange.next(this.buildNodeTree(parsedMenu, 0));
          }
        });
    }
  }

  /**
   * Build the file structure tree. The `value` is the Json object, or a sub-tree of a Json object.
   * The return value is the list of `MenuNode`.
   */
  buildNodeTree(obj: { [key: string]: any }, level: number): MenuNode[] {
    return Object.keys(obj).reduce<MenuNode[]>((accumulator, key) => {
      const node = new MenuNode();

      // берем элемент, и начинаем его создавать со всеми дочерними элементами
      const templateNode = obj[key];

      if (templateNode) {
        // маппинг имени
        node.$name = templateNode.name || '';
        // системное имя меню
        node.$sysName = templateNode.sysname || '';
        // url на dash
        node.$pathOfDash = templateNode.pathOfDash || '';
        // картинка пункта меню
        node.$image = templateNode.image || '';
        // смещение относительно родительского элемента
        node.$offset = String(level * 50) + 'px' || '0px';
        // маппим дочерние элементы
        if (templateNode.children && (templateNode.children instanceof Array)) {
          const upLevel = level + 1;
          templateNode.children.forEach(child => {
            node.$children.push(... this.buildNodeTree(child, upLevel));
          });
        }
      }

      return accumulator.concat(node);
    }, []);
  }


}


