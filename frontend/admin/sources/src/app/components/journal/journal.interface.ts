/**
 * Маркер контекста журнала. Любой компонент, который работает с журналом
 * должен имплементировать этот интерфейс. В противном случае будет невозможным
 * работа с сервисом журнала
 */
export interface IJournal {
  /**
   * Метод получения контекста вызова
   */
  getContext(): IJournal;
}
