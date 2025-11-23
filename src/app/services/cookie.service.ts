import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CookieService {

  constructor() { }

  /**
   * Set a cookie with the given name, value, and options
   */
  setCookie(name: string, value: string, days: number = 1): void {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Strict${location.protocol === 'https:' ? ';Secure' : ''}`;
  }

  /**
   * Get a cookie value by name
   */
  getCookie(name: string): string | null {
    const nameEQ = name + '=';
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  /**
   * Delete a cookie by name
   */
  deleteCookie(name: string): void {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;SameSite=Strict${location.protocol === 'https:' ? ';Secure' : ''}`;
  }

  /**
   * Delete all authentication cookies
   */
  clearAllAuthCookies(): void {
    this.deleteCookie('tenantJwt');
    this.deleteCookie('schoolAdminJwt');
    this.deleteCookie('teacherJwt');
    this.deleteCookie('studentJwt');
    this.deleteCookie('superAdminJwt');
  }

  /**
   * Check if user is authenticated (has any auth cookie)
   */
  isAuthenticated(): boolean {
    return !!(
      this.getCookie('tenantJwt') ||
      this.getCookie('schoolAdminJwt') ||
      this.getCookie('teacherJwt') ||
      this.getCookie('studentJwt') ||
      this.getCookie('superAdminJwt')
    );
  }
}


