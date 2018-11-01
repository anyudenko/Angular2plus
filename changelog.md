# Что было сделано

### 1. Созданы интеграционные юнит тестов для компонентов

  * product.component.spec.ts - для ProductComponent
  * cart-item.component.spec.ts - для CartItemComponent 


### 2. Созданы изолированные юнит тесты для сервисов и пайпов

  * app-settings.service.spec.ts - для сервиса AppSettingsService
  * order-by.pipe.spec.ts - для пайпа OrderByPipe


### 3. Создан поверхностный юнит тест для AppComponent

В тесте app.component.spec.ts используется testing-helpers/router-stubs.ts


### 4. Проанализированно покрытие кода тестами

Информация о покрытии кода тестами находится в coverage/index.html (ng test --code-coverage).

Покрытие кода тестами составляет:
  * Statements - 73.3% (538/734)
  * Branches - 58.03% (347/598)
  * Functions - 61.18% (93/152)
  * Lines - 76.36% (449/588)


18 specs, 0 failures:
  * AppComponent
    * There are should be 5 RouterLinks in the template
    * The links should be ordered in next way: Products(home), Cart, Admin, Login, Contact Us
    * Links are clickable
    
  * CartItemComponent
    * CartItemComponent should change background by hover
    * CartItemComponent should call qtyDecrease event by "-" btn clicked
    * CartItemComponent should call qtyIncrease event by "+" btn clicked

  * AppSettingsService (with TestBed)
    * getSettings should return value from LS (if the value exists in LS)
    * getSettings should return value from json file (if the value doesn't exists in LS)

  * ProductComponent
    * ProductComponent should have a piped title (uppercase)
    * ProductComponent should be disabled if he isn't available (isAvailable = false)
    * ProductComponent shouldn't be disabled if he is available (isAvailable = true)
    * ProductComponent should call buyProduct event when Buy btn clicked

  * OrderByPipe
    * Sort orderList by name (asc)
    * Sort orderList by name (desc)
    * Sort orderList by qty (asc)
    * Sort orderList by qty (desc)
    * Sort orderList by price (asc)
    * Sort orderList by price (desc)
