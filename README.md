# Currency Converter

Небольшой конвертер валют на React, TypeScript и Vite.

Во второй домашке приложение работает без API. Все валюты, курсы и описания берутся из локальных мок-данных.

## Запуск проекта

Установить зависимости, если они еще не установлены:

```bash
npm install
```

Запустить проект:

```bash
npm run dev
```

Собрать проект:

```bash
npm run build
```

Запустить тесты:

```bash
npm run test
```

Запустить линт:

```bash
npm run lint
```

## Что реализовано

- выбор валюты, из которой конвертируем;
- выбор валюты, в которую конвертируем;
- ввод суммы;
- пересчет результата при изменении суммы;
- пересчет результата при изменении валютной пары;
- запрет одинаковых валют в двух селектах;
- кнопка Swap для обмена валют местами;
- блок More about с описанием выбранных валют;
- fallback-текст, если у валюты нет описания;
- сброс открытого состояния More about при смене валютной пары.

## Мок-данные

Моки лежат в папке `src/mocks`.

`src/mocks/currencies.ts` содержит список валют для селектов:

```ts
export const currencies: Currency[];
```

`src/mocks/priceChanges.ts` содержит курсы валют:

```ts
export const priceChanges: Record<string, Record<string, PriceChange>>;
```

Курс берется по пути:

```ts
priceChanges[fromCurrency][toCurrency].price;
```

Результат считается так:

```ts
price * amount;
```

Типы данных лежат в `src/models`:

- `Currency`;
- `PriceChange`.

## Reset по key

Компонент `MoreAboutCurrencies` хранит локальное состояние open/closed через `useState`.

В `src/pages/Main/Main.tsx` ему передается `key`, который зависит от текущей валютной пары:

```tsx
key={`${fromCurrency.code}-${toCurrency.code}`}
```

Когда пользователь меняет пару валют, `key` меняется. React пересоздает дочерний компонент, поэтому его локальное состояние сбрасывается, и блок More about снова закрыт.

## Тесты

Тесты написаны на Vitest и React Testing Library.

Покрытые сценарии:

- рендер поля суммы и двух селектов валют;
- валюты в селектах берутся из моков;
- пересчет результата при изменении суммы;
- пересчет результата при изменении валютной пары;
- запрет одинаковых валют;
- Swap меняет валюты местами и обновляет результат;
- reset состояния More about при смене пары;
- поведение компонента CurrencyRow;
- поведение компонента MoreAboutCurrencies.

Файлы с тестами:

- `src/pages/Main/Main.test.tsx`;
- `src/components/CurrencyRow/CurrencyRow.test.tsx`;
- `src/components/MoreAboutCurrencies/MoreAboutCurrencies.test.tsx`.
