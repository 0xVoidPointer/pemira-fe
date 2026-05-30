declare global {
  interface WindowEventMap {
    "auth:expired": CustomEvent;
  }
}

export {};
