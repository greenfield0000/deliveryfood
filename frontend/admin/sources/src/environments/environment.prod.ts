import { HttpHeaders } from '@angular/common/http';
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  /**
   * Заголовки, которые требует сервер
   */
  headers: new HttpHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Methods': 'GET, POST, DELETE, PUT',
    'Access-Control-Allow-Origin': '*'
  }),

  gatePath: {
    // запросы к модулю авторизации, регистрации, логину и т.д.
    auth_location: 'http://localhost:8080/auth-gate',
    // запросы к модулю меню
    menu_location: 'http://localhost:8080/menu-gate',
    // запросы к модулю журнала
    journal_location: 'http://localhost:8080/journal-gate',
    // запросы к модулю кладр
    kladr_location: 'http://localhost:8080/kladr-gate'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
