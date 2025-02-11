import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FileServiceService } from '../../services/file-service.service';
import { EventServiceService } from '../../services/event-service.service';
import { Photo } from '../../model/photo';

@Component({
  selector: 'app-file-loader',
  standalone: true,
  imports: [],
  templateUrl: './file-loader.component.html',
  styleUrl: './file-loader.component.scss'
})
export class FileLoaderComponent {

  @Input()
  public multiple: boolean = false;

  @Output()
  onFileLoaded: EventEmitter<{ name: string, file: string }> = new EventEmitter();

  @ViewChild('fileInput')
  fileInput!: ElementRef;

  constructor(private fileService: FileServiceService, private eventService: EventServiceService, private changeDetector: ChangeDetectorRef) {
  }

  handleFileInput(files: FileList) {
    if (files != null)
      [...files].filter(file => {
        const mimeType = file.type;
        if (mimeType.match(/image\/*/) == null) {
          return false;
        }
        return true
      })
        .forEach(file => {
          const reader = new FileReader();
          reader.readAsDataURL(file);

          reader.onload = (_event) => {
            if (typeof reader.result === "string") {
              this.onFileLoaded.emit({ name: file.name, file: reader.result });
            }
          }
        })
    this.fileInput.nativeElement.value = "";
    this.changeDetector.detectChanges();
  }
}
