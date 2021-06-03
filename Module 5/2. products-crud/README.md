# Корзина товаров

Документация API, которое требуется для завершения данной задачи: https://documenter.getpostman.com/view/151707/TzJx7bhR#9fe3d77e-1694-4a34-a6c5-084d02572715

## Задача

Написать 2 React компонета:

- `ProductList.js` - комонент, отрисовывающий список продуктов, достыпных по API, и форму добавления нового товара
- `ProductRow.js` - компонент, отрисовывающий один продукт в списке.

`ProductList` должен использовать `ProductRow` для отрисовки каждого продукта

Компонент (`src/components/ProductRow.js`) принимает 2 значение в `props`:

- `product` - объект продукта, полученый из API
- `deleteProduct` - функция, при вызове которой данный продукт удаляется.

Компонент (`src/components/ProductList.js`) должен показывать на экране:

- Список всех товаров (используя `ProductRow` компонента)
- Форму добавления нового товара (2 инпута, один для названия, второй для цены, и кнопку добавления)
- Элемент загрузки если данные еще не загрузились с сервера
- Элемент с ошибкой, если во время загрузки произошла ошибка

### Условия:

- Изначально на экране показывается элемент загрузки
- При первом маунте компонента данные начинают загружаться
- По окончанию загрузки элемент загрузки скрывается и показывается список продуктов
- При нажатии на кнопку добавления, приложение должно а) отправить запрос на добавление продукта в список продуктов и б) показать новый продукт в списке продуктов
- При нажатии на кнопку удаления одного из продуктов, приложение должно а) отправить запрос на удаление продукта из списка и б) убрать продут их списка товаров на экране

Обратите внимание на комментарии в фаилах компонента, они помогут вам в решении задания.

### Проверка:

Чтобы мы могла автоматически проверить ваше решение, добавте в ваш компонент следующие атрибуты:

- `data-testid="input-title"` элементу `input`, в который должно быть введено значение название нового продукта
- `data-testid="input-price"` элементу `input`, в который должно быть введено значение цены нового продукта
- `data-testid="button-add-product"` элементу `button`, при нажатию на который будет добавлен новый продукт
- `data-testid="loading-message"` элементу загрузки
- `data-testid="error-message"` элементу ошибки

### Список тестов, которые будут запущены на вашем решении:

- ✓ ProductsList компонент должен наследовать React.Component
- ✓ Корректно отрисовывает компонент App
- ✓ Загружает данные при первом рендере компонента, вместе с элементом лоадера
- ✓ Для каждого продукта, отрисовывает его название, цену и кнопку удаления
- ✓ Показывает сообщение об ошибке
- ✓ Отрисовывает форму добавления нового товара
- ✓ При событии ввода в инпут названия товара, значение инпута меняется
- ✓ При событии ввода в инпут цены товара нечислового значения, значение инпута не меняется
- ✓ Кнопка создания товара не активна, если значения названия или цены не введены
- ✓ При нажатии на кнопку добавления товара, новый товар добавляется в список товаров
- ✓ При нажатии на кнопку удаления товара, товар удаляется из списока товаров

### Смотреть результаты

После решения задачи, сделайте `push` вашего решения. Это запустит Github Action с тестами вашего задания.
Во вкладке Actions в GitHub слева вы увидите все запуски тестов для всех задач. Найдите там "Модуль 3, Задача 1: Список товаров" и выберите его. Вы увидете список всех запусков тестов на вашем решении.
Если иконка возле последнего запуска зеленая - все хорошо, задание решено верно. Если нет - вы можете зхайти внутрь и посмотреть, что не сработало.

Также можно запускать эти тесты на вашем компьютере через `npm test`.