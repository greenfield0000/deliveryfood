export abstract class ReactiveForm {
    constructor() { }
    /**
   * Метод регистрации подписок формы
   */
    protected abstract registrySubscription(): void;
}
