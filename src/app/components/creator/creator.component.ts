import { Component, Input } from '@angular/core';
import { FileLoaderComponent } from "../file-loader/file-loader.component";
import { PhotoCropperComponent } from "../photo-cropper/photo-cropper.component";
import { FileServiceService } from '../../services/file-service.service';
import { Photo } from '../../model/photo';
import { EventServiceService } from '../../services/event-service.service';
import { CommonModule } from '@angular/common';
import { v7 as uuidv7 } from 'uuid';
import { PhotoEventListener } from '../../model/photo-saved-listener';

@Component({
  selector: 'app-creator',
  standalone: true,
  imports: [CommonModule, FileLoaderComponent, PhotoCropperComponent],
  templateUrl: './creator.component.html',
  styleUrl: './creator.component.scss'
})
export class CreatorComponent implements PhotoEventListener {


  public items: { [key: string]: { photo: Photo } } = {}

  // indexOrderAsc = (akv: KeyValue<string, any>, bkv: KeyValue<string, any>): number => {
  //   const a = akv.value.order;
  //   const b = bkv.value.order;

  //   return a > b ? 1 : (b > a ? -1 : 0);
  // };

  constructor(private fileService: FileServiceService, private eventService: EventServiceService) {
  }

  photoSaved(key: string): void {
    //ignored
  }
  photoLoaded(key: string): void {
    this.items[key].photo = this.fileService.getPhoto(key);
    this.addNewPhotoPanelIfNeeded();

  }
  photoRemoved(key: string): void {
    delete this.items[key];
    // this.removeEmptyPanelIfNeeded();
  }

  ngOnInit(): void {
    this.eventService.addPhotoEventListener(this);
    this.fileService.getPhotos().forEach((photo, i) => {
      this.items[photo.id] = { photo }
    });
    this.addNewPhotoPanel()
  }

  cropResult(id: string | undefined, data: any) {
    if (!!id && !!this.items[id]) {
      this.fileService.savePhoto({ ...this.items[id].photo, cropped: data })
    }
  }

  private addNewPhotoPanelIfNeeded(): void {
    const lastId = Object.keys(this.items).sort().pop();
    if(!!lastId){
      const lastPic = this.items[lastId];
      if (!!lastPic?.photo.file) {
        this.addNewPhotoPanel()
      }
    }
  }

  private addNewPhotoPanel(): void {
    const id = uuidv7();
    this.items[id] = { photo: { id: id } as Photo}
  }

  remove(id: string) {
    this.fileService.removePhoto(id)
    this.addNewPhotoPanelIfNeeded()
  }

  getCount() {
    return Object.keys(this.items).length;
  }

}