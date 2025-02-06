import { Injectable } from '@angular/core';
import { Photo } from '../model/photo';
import { EventServiceService } from './event-service.service';

@Injectable({
  providedIn: 'root'
})
export class FileServiceService {

  private photos: { [key: string]: Photo } = {};

  constructor(private eventService: EventServiceService) { }

  public savePhoto(photo: Photo) {
    this.photos[photo.id] = photo
    this.eventService.photoSaved(photo.id)
  }

  public getPhoto(id: string): Photo {
    return this.photos[id];
  }

  public getPhotos(): Array<Photo> {
    return Object.values(this.photos);
  }

  removePhoto(id: string) {
    delete this.photos[id];
    this.eventService.photoRemoved(id)
  }


}
