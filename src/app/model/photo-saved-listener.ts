export interface PhotoEventListener {

    photoSaved(key: string): void; 
    photoLoaded(key: string): void;
    photoRemoved(key: string): void;

}
