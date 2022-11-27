import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LangLocalStorageService {
  constructor() { }

  public setLang(lang: string) {
    localStorage.setItem('lang', lang);
  }

  public getLang() {
    return localStorage.getItem('lang');
  }
}
