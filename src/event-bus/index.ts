const DEFAULT_EVENT_NAME = Symbol('default-event-name');

type EventName = string | symbol;

interface IListener {
    eventName: EventName;
    callback: (val: any) => void;
}

export class EventBus {
    listeners: IListener[] = [];

    public emit(val?: any) {
        this.listeners
            .filter(i => i.eventName === DEFAULT_EVENT_NAME)
            .forEach(i => i.callback(val));
    }

    public listen(p: IListener | IListener['callback']) {
        const listener =
            typeof p === 'function' ? { eventName: DEFAULT_EVENT_NAME, callback: p } : p;

        this.listeners.push(listener);

        return listener;
    }

    public emitWithEventName(eventName: EventName, val?: any) {
        this.listeners.filter(i => i.eventName === eventName).forEach(i => i.callback(val));
    }

    public unlisten(listener: IListener) {
        this.listeners = this.listeners.filter(l => l !== listener);
    }
}

export default EventBus;
