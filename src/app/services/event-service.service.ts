import { Injectable } from '@angular/core';
import { PhotoEventListener } from '../model/photo-saved-listener';


@Injectable({
  providedIn: 'root'
})
export class EventServiceService {

  photoEventListeners: PhotoEventListener[] = []


  constructor() { }

  public addPhotoEventListener(listener: PhotoEventListener) {
    this.photoEventListeners.push(listener)

  }

  public fileLoaded(key: string) {
    this.photoEventListeners.forEach(listener => {
      listener.photoLoaded(key);
    })
  }

  public photoSaved(key: string) {
    this.photoEventListeners.forEach(listener => {
      listener.photoSaved(key);
    })
  }

  public photoRemoved(id: string) {
    this.photoEventListeners.forEach(listener => {
      listener.photoRemoved(id);
    });
  }

}
