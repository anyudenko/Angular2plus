# Что было сделано

### 1. Для части приложения внесены изменения

  * Установлен модуль @ngrx/schematics и добавлены конфигурации для cli
  * Добавлены модули @ngrx/store и @ngrx/effects
  * Установлен млодуль @ngrx/store-devtools, добавлено Redux DevTools расширение для Chrome браузера.
  * В структуру проекта добавлена папка +store.


### 2. Создан и внедрён state приложения с разделение на фичи

**2.1. State**

  * В корне +store находится AppState и CoreStoreModule
  * В +store/products находится стейт фичи Product.


Store был заинджекчен в компоненты:

  * ProductListComponent
  * ProductFormComponent


**2.2. Actions**

Тип описания: Class with static readonly + enum + ActionCreators.

Созданы следующие actions для Product фичи:

  * GetProducts, GetProductsSuccess, GetProductsError
  * DeleteProduct, DeleteProductSuccess, DeleteProductError
  * CreateProduct, CreateProductSuccess, CreateProductError  
  * UpdateProduct, UpdateProductSuccess, UpdateProductError


**2.3. Reducers**

Соданы редюсеры для каждого типа события:

  * GetProducts, GetProductsSuccess, GetProductsError
  * DeleteProduct, DeleteProductSuccess, DeleteProductError
  * CreateProduct, CreateProductSuccess, CreateProductError  
  * UpdateProduct, UpdateProductSuccess, UpdateProductError


**2.4. Effects**

Созданы сайд эфекты для работы с БД:

  * getProducts
  * deleteProduct
  * createProduct
  * updateProduct


**2.5. Selectors**

  * Создан feature selector - getProductsState
  * Созданы state selectors - getProductsData, getProductsError, getProductByUrl


### 3. Внедрён @ngrx/router-store

  * Установлен модуль @ngrx/router-store
  * Добавлена папка router
  * Созданы router state, reducer, selector, actions, effects
  * Router state использован при написании селектора getProductByUrl (products.selectors)
  * Добавлена router навигация


Навигация была заменена в 

  * компонентах (ProductListComponent, ProductFormComponent)
  * эффектах createUpdateTaskSuccess (products.effects)
  * AuthGuard


### 4. @ngrx/entity





