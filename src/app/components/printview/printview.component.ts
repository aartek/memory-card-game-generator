import { Component, Input } from '@angular/core';
import { Photo } from '../../model/photo';
import { FileServiceService } from '../../services/file-service.service';
import { EventServiceService } from '../../services/event-service.service';
import { CommonModule, NgFor } from '@angular/common';
import { PhotoEventListener } from '../../model/photo-saved-listener';

@Component({
  selector: 'app-printview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './printview.component.html',
  styleUrl: './printview.component.scss'
})
export class PrintviewComponent implements PhotoEventListener {

  @Input("printBorders")
  public printBorders: boolean = true;


  public items: { [key: string]: Photo } = {}

  constructor(private fileService: FileServiceService, private eventService: EventServiceService) {
  }

  photoSaved(key: string): void {
    this.items[key] = this.fileService.getPhoto(key)
  }

  ngOnInit(): void {
    this.eventService.addPhotoEventListener(this);
    this.fileService.getPhotos().forEach(photo => {
      this.items[photo.id] = photo
    });
  }

  photoLoaded(key: string): void {
    //ignore
  }
  photoRemoved(key: string): void {
    delete this.items[key];
  }

}
