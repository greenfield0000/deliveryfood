import { AppRouteService } from './../../services/app-route-service/app-route.service';
import { MenuService } from './../../services/menu-service/menu.service';
import { Component } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material';
import { Observable, of as observableOf } from 'rxjs';
import { MenuFlatNode } from 'src/app/classes/menu-flat-node';
import { MenuNode } from 'src/app/classes/menu-node';
import { MainSideNavService } from 'src/app/services/main-side-nav-service/main-side-nav.service';


@Component({
  selector: 'app-tree-flat-overview',
  templateUrl: './tree-flat-overview.component.html',
  styleUrls: ['./tree-flat-overview.component.scss']
})
export class TreeFlatOverviewComponent {
  treeControl: FlatTreeControl<MenuFlatNode>;
  treeFlattener: MatTreeFlattener<MenuNode, MenuFlatNode>;
  dataSource: MatTreeFlatDataSource<MenuNode, MenuFlatNode>;

  constructor(private database: MenuService, private appRouterService: AppRouteService, private menuService: MenuService, private sideNavService: MainSideNavService) {
    this.treeFlattener = new MatTreeFlattener(this.transformer, this._getLevel,
      this._isExpandable, this._getChildren);
    this.treeControl = new FlatTreeControl<MenuFlatNode>(this._getLevel, this._isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

    this.database.dataChange.subscribe(data => {
      this.dataSource.data = data; console.log('database = ', data);
    });
  }

  transformer = (node: MenuNode, level: number) => {
    return new MenuFlatNode(!!node.$children, node.$name, level, node.$pathOfDash, node.$image);
  }

  private _getLevel = (node: MenuFlatNode) => node.level;

  private _isExpandable = (node: MenuFlatNode) => node.expandable;

  private _getChildren = (node: MenuNode): Observable<MenuNode[]> => observableOf(node.$children);

  hasChild = (_: number, _nodeData: MenuFlatNode) => _nodeData.expandable;

  /**
   * Функция перехода по клику на пункт меню (для всех будет одинаковой),
   * у каждого пункта меню должен быть свой путь
   *
   * @param pathOfDash - путь
   */
  nodeClick(node: MenuFlatNode) {
    if (node && node.pathOfDash) {
      this.sideNavService.$menuNavigatorDrawer.close();
      this.appRouterService.goTo(`/dashbord/${node.pathOfDash}`, { skipLocationChange: true });
    }
  }
}
