# Что было сделано

### 1. Создан компонент ProcessOrderComponent

  * Добавлены изменения в роутер
  * Изменена логика оформения заказа

При нажатии на кнопку "Buy / Complete order" в корзине, 
происходит редирект на страницу с формой (ProcessOrderComponent). 
Только после успешного прохождения валидации заказ оформляется.


### 2. Добавлена форма с валидацией в ProcessOrderComponent

Тип формы - Data driven (Reactive form).

Поля формы:
  * Обязательные поля:
    * firstNameId
    * lastNameId
    * email
    * phone
    
  * Радиобаттоны:
    * deliveryType
    * paymentType
    
  * Группа address (появляется если был выбран тип "доставка" в deliveryType):
    * city
    * streetLine1
    * streetLine2


В стилях были использованы следующие css классы форм:
  * ng-touched
  * ng-valid
  * ng-invalid.


В шаблоне формы использованы директивы:
  * formGroup
  * formGroupName
  * formControlName
  * formArrayName


В компоненте ProcessOrderComponent спользованы следующие классы:
  * FormControl
  * FormGroup (для группировки полей адреса) 
  * FormArray (для дублирования телефонов)
  * FormBuilder


Добавлено дублирование поля phone. Добавлена возможность:
  * добавить номер телефона
  * удалить номер телефона (нельзя удалить номер телефона если он всего 1)


В методе setDeliveryType происходит динамическое изменения правил валидации. 
Для полей адреса устанавливается required, если выбран тип "доставка" в deliveryType.
Иначе правила валидации для этих полей сбрасываются.

Для этого использовались методы:
  * clearValidators
  * setValidators
  * updateValueAndValidity


Формирование и вывод сообщений валидации реализовано в классе компонета.


++
Использован debounceTime для задержка валидации на 1.5 секунд.

описать Validator

