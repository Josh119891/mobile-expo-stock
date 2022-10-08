# EXPO-STOCK

## Description

- [ ] User and data management: Firebase
- [ ] Financial instrument data: Alpha Vantage
- [ ] Bring search capability to mobile application: Algolia

### Install

```Shell
  yarn install
```

### Mock data in Algolia

```typescript
import { Stock } from '../types';

export const IMAGES = {
  APPLE: 'https://media.idownloadblog.com/wp-content/uploads/2018/07/Apple-logo-black-and-white.png',
  GAMESTOP: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRSAEkMppA3qSB0wwZtjDc3SbMLzJXx0mCaVb5YW9r&s',
  DISNEY: 'https://cdn1.iconfinder.com/data/icons/logos-brands-5/512/disney-plus-2-512.png',
  TESLA: 'https://assets.stickpng.com/images/5ec3e21d58550c000442773a.png',
  NIKE: 'https://cdn.iconscout.com/icon/free/png-256/nike-3-202655.png',
  AMAZON: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Amazon_icon.png',
};
export const stocks: Stock[] = [
  { title: 'Apple', symbol: 'AAPL', follow: false },
  { title: 'GameStop', symbol: 'GME', follow: false },
  { title: 'Disney', symbol: 'DIS', follow: false },
  { title: 'Tesla', symbol: 'TSLA', follow: false },
  { title: 'Nike', symbol: 'NKE', follow: false },
  { title: 'Amazon', symbol: 'AMZN', follow: false },
];
```

## Firebase Authentication and OTP

### Mock data for testing

Phone number / Verification code
+1 650-555-3434 / 654321
+86 12355123555 / 123123
