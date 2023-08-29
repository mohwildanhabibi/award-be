# ExpressJS - Award App Backend

please ask the owner for the .env file to run it locally

## Installation

to run it locally, please copy .env file to project folder then run

```bash
  npm run install
  npm run dev
```

## API Reference

#### create new user

```http
  Post /auth/signup
```

| Parameter  | Type     | Description  |
| :--------- | :------- | :----------- |
| `email`    | `string` | **Required** |
| `password` | `string` | **Required** |

#### login using existing user

```http
  Post /auth/signin
```

| Parameter  | Type     | Description  |
| :--------- | :------- | :----------- |
| `email`    | `string` | **Required** |
| `password` | `string` | **Required** |

#### Get award item

```http
  GET /award
```

| Parameter     | Type     | Description                                                       |
| :------------ | :------- | :---------------------------------------------------------------- |
| `page`        | `number` | _Optional_, default 1, page of data, related to limit params      |
| `limit`       | `number` | _Optional_, how many maximal data to be fetch                     |
| `pointNeeded` | `number` | _Optional_, how many maximal point                                |
| `type`        | `array`  | _Optional_, type of item, ex: ["Vouchers", "Product", "Giftcards] |
