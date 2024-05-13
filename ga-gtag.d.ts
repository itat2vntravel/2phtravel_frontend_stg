declare module 'ga-gtag' {
    export function gtag(command: string,...args: any[]): void;
    export function install(trackingId: string, options?: object): void;
    export function initDataLayer(): void
  }