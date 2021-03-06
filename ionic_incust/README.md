# Тестовое задание inCust Ltd (Katalina)

inCust Ltd

## Видео демонстрация выполненного задания




https://user-images.githubusercontent.com/11452353/128328501-791fde21-cff2-4e35-9c59-6afbee3c9c5e.mp4




### Исходное описание прикладываю (прислали как всегда "хотелки клиента", а не нормальную спецификацию, но уже получше предыдущего)

Цель задания:
Продемонстрировать свои знания и умения при создании простого гибридного приложения. Основное, что мы будем анализировать по результатам - это ваш исходный код, знание подходов и хороших практик
ВАЖНО! Не делайте тест, если вы хотите показать нам, что вы можете просто сделать это задание. Сам факт работы приложения нам не важен. Если у вас нет опыта именно с гибридными приложениями, вы изучаете технологии на ходу, не знаете "хороших" практик или не сумеете их потом объяснить на собеседовании - лучше не тратьте свое и наше время.

1. Развернуть проект [ionic](https://ionicframework.com/)
не важно 3 или 4 или 5, [на выбор](https://ionicframework.com/docs/installation/cli)

2. положить data.json в свой проект и в качестве данных использовать его

3. Сделать два экрана/страниц
А) Экран/страница списков товаров
- [x] вывести список позиций из data.json https://prnt.sc/rf5yvi
- [x] сделать поле поиска по списку (поле name) с использованием RxJs https://prnt.sc/rf5yi4
- [x] поисковый запрос сохранить (использовать https://ionicframework.com/docs/building/storage), при перезагрузке стр использовать по умолчанию последний сохраненный поисковый запрос
- [x] при клике, переход на экран/страницу товара

Б) Экран/страница информации о товаре https://prnt.sc/rf65td
- сделать калькулятор, который будет состоять из двух полей суммы и количество, вводя данные в поле сумма, нужно автоматически считать данные для поля количество и наоборот
- сделать кнопки для быстрого ввода предвыбора, кнопка может указывать количество или сумму калькулятор должен автоматически просчитывать

Просим по результатам работы предоставить одновременно:
1) Результат работы закоммитить и предоставить ссылку на git
2) На ваш выбор:
- Или собрать apk для Android с Cordova. Мы сумеем запустить и посмотреть
- [x] Или запустить на iphone Simulator. Для сборки использовать флаги --prod --release. Так как мы не сумеем запустить вашу сборку на IOS просьба в этом случае снять
подробное видео как работает ваше приложение со всеми реализованными функциями

## Описание

###  Во время запуска приложения
- Загрузка сохраненного поискового запроса и выполнение поиска
- Выводится список найденных товаров на странице
<br/>

- При клике на товар выполняется перехоход на страницу товара


###  Страница товара
- На странице товара показывается:  sku-номер, изображение, название, описание, цена, функционал `Calculator`

###  Функционал `Calculator`
- Вывести на экран 2 поля ввода - `amount` и `qty`, доллары и кол-во соответственно.
- При вводе `amount`, в поле `qty` записывается максимальное кол-во товара, которое можно купить за `amount`
- При вводе `qty`, в поле `amount` записывается цена за `qty` штук товара.
- `qty` - целое число (не может быть с плавющей точкой)
- `amount` - ограничено 2-мя знаками после запятой

## Install the dependencies
```bash
npm i
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
For iOS
```bash
npm run dev:ios
```
For Android
```bash
npm run dev:ios
```

### Lint the files
```bash
npm run lint
```

### Build the app for production
```bash
npm run build
```

### Customize the configuration
See [Ionic Docs](https://ionicframework.com/docs).
