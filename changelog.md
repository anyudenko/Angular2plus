# Что было сделано

### 1. Созданы интеграционные юнит тестов для компонентов

  * product.component.spec.ts - для ProductComponent
  * 2


### 2. Созданы изолированные юнит тесты для сервисов и пайпов

  * app-settings.service.spec.ts - для сервиса AppSettingsService (c TestBed)
  * order-by.pipe.spec.ts - для пайпа OrderByPipe


### 3. Создан поверхностный юнит тест для AppComponent

В тесте app.component.spec.ts используется testing-helpers/router-stubs.ts


### 4. Проанализированно покрытие кода тестами

Информация о покрытии кода тестами находится в coverage/index.html (ng test --code-coverage).

Покрытие кода тестами составляет:
  * Statements - 72.15% (474/657)
  * Branches - 56.02% (298/532)
  * Functions - 58.52% (79/135)
  * Lines - 75.53% (395/523)
