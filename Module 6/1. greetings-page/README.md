# Greetings page

## Задача

Написать React приложене с одной страницей, которая будет приветствовать пользователя по имени из параметров URL

Компонент (`src/pages/Greetings.js`) является страницей приветствия.
Данный компонент должен отрисовывать имя, полученное из параметров страницы
Страница должны бать доступна по адресу `/greetings/:name`

Компонент (`src/App.js`) должен отрисовывать Router с единственным Route:

- `component` этого `Route` должен быть компонентом из файла `src/pages/Greetings.js`
- `path` этого `Route` должен быть `/greetings/:name`

### Условия:

### Список тестов, которые будут запущены на вашем решении:

- ✓ Greetings компонент должен наследовать React.Component

### Смотреть результаты

После решения задачи, сделайте `push` вашего решения. Это запустит Github Action с тестами вашего задания.
Во вкладке Actions в GitHub слева вы увидите все запуски тестов для всех задач. Найдите там "Модуль 3, Задача 1: Список товаров" и выберите его. Вы увидете список всех запусков тестов на вашем решении.
Если иконка возле последнего запуска зеленая - все хорошо, задание решено верно. Если нет - вы можете зхайти внутрь и посмотреть, что не сработало.

Также можно запускать эти тесты на вашем компьютере через `npm test`.
