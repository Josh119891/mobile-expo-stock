import { Stock } from "../types";

export const IMAGES = {
  APPLE: "https://media.idownloadblog.com/wp-content/uploads/2018/07/Apple-logo-black-and-white.png",
  GAMESTOP: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRSAEkMppA3qSB0wwZtjDc3SbMLzJXx0mCaVb5YW9r&s",
  DISNEY: "https://cdn1.iconfinder.com/data/icons/logos-brands-5/512/disney-plus-2-512.png",
  TESLA: "https://assets.stickpng.com/images/5ec3e21d58550c000442773a.png",
  NIKE: "https://cdn.iconscout.com/icon/free/png-256/nike-3-202655.png",
  AMAZON: "https://upload.wikimedia.org/wikipedia/commons/d/de/Amazon_icon.png",
};
export const stocks: Stock[] = [
  { title: "Apple", symbol: "AAPL", follow: false, img: IMAGES.APPLE },
  { title: "GameStop", symbol: "GME", follow: false, img: IMAGES.GAMESTOP },
  { title: "Disney", symbol: "DIS", follow: false, img: IMAGES.DISNEY },
  { title: "Tesla", symbol: "TSLA", follow: false, img: IMAGES.TESLA },
  { title: "Nike", symbol: "NKE", follow: false, img: IMAGES.NIKE },
  { title: "Amazon", symbol: "AMZN", follow: false, img: IMAGES.AMAZON },
];
