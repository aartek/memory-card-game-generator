import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CreatorComponent } from "./components/creator/creator.component";
import { PrintviewComponent } from "./components/printview/printview.component";
import { PhotoEventListener } from './model/photo-saved-listener';
import { EventServiceService } from './services/event-service.service';
import { FileServiceService } from './services/file-service.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, CreatorComponent, PrintviewComponent, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements PhotoEventListener {

  title = 'memory-game-generator';
  numberOfPhotos: number = 0;
  addBorders: boolean = true;

  constructor(private eventService: EventServiceService, private fileService: FileServiceService) {
    this.eventService.addPhotoEventListener(this);
  }


  photoSaved(key: string): void {
    this.updateNumberOfPhotos();
  }

  photoLoaded(key: string): void {
    //ignored

  }
  photoRemoved(key: string): void {
    this.updateNumberOfPhotos();
  }

  print() {
    window.print();
  }

  private updateNumberOfPhotos() {
    this.numberOfPhotos = this.fileService.getPhotos().filter(photo => !!photo.cropped).length;

  }
}
