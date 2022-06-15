declare type EventName = string | symbol;
interface IListener {
    eventName: EventName;
    callback: (val: any) => void;
}
export declare class EventBus {
    listeners: IListener[];
    emit(val?: any): void;
    listen(p: IListener | IListener['callback']): IListener;
    emitWithEventName(eventName: EventName, val?: any): void;
    unlisten(listener: IListener): void;
}
export default EventBus;
