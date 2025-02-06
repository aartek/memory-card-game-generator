import { CommonModule, NgFor } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { AngularCropperjsModule, CropperComponent } from 'angular-cropperjs';
import { FileLoaderComponent } from "../file-loader/file-loader.component";
import { Photo } from '../../model/photo';

@Component({
  selector: 'app-photo-cropper',
  standalone: true,
  imports: [AngularCropperjsModule, CommonModule],
  templateUrl: './photo-cropper.component.html',
  styleUrl: './photo-cropper.component.scss'
})
export class PhotoCropperComponent implements OnInit {
  ngOnInit(): void {
    this.ctx = { item: this.photo }
  }

  ctx = {}

  @Input("photo")
  public photo?: Photo;

  @ViewChild('angularCropper') public angularCropper?: CropperComponent;

  @Output("result")
  public result = new EventEmitter<any>();

  public config: any = {
    responsive: false,
    minCanvasHeight: 300,
    minCanvasWidth: 300,
    aspectRatio: 1,
    viewMode: 3,
    dragMode: 'move',
    autoCropArea: 1
  };

  @Input()
  fileloader!: TemplateRef<any>;

  @Input()
  buttons!: TemplateRef<any>;

  crop() {
    const cropped = this.angularCropper?.cropper.getCroppedCanvas().toDataURL("image/png");
    this.photo!.cropped = cropped;
    this.result.emit(cropped)
  }

  remove() {
    throw new Error('Method not implemented.');
  }

}

