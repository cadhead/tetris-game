class Observer {
  private subscribers: { [key: string]: Function[] } = {};

  subscribe(eventName: string, handler: Function) {
    if (this.subscribers[eventName] instanceof Array) {
      this.subscribers[eventName].push(handler);
    } else {
      this.subscribers[eventName] = [handler];
    }
  }

  unsubscribe(eventName: string, handler: Function) {
    this.subscribers[eventName] = this.subscribers[eventName]
      .filter(
        subscriber => subscriber !== handler,
      );
  }

  notifySubscribers(eventName: string, data?: unknown): void {
    const subscribers = this.subscribers[eventName];

    if (!subscribers) return;

    for (const handler of subscribers) {
      handler(data);
    }
  }
}

export default Observer;
