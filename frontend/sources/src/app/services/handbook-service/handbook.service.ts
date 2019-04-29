import { Injectable } from '@angular/core';


/**
 * Сервис для загрузки всевозможных справочников.
 *
 * Предполагается загрузка как для авторизованного пользователя,
 * так и для пользователей не прошедших авторизацию.
 *
 * Отличие загрузки методов в том, что в одном случае необходима
 * передача сессии
 *
 */
@Injectable({
  providedIn: 'root'
})
export class HandbookService {

  // функционал отложен до реализации сервиса сессий

  constructor() { }

}