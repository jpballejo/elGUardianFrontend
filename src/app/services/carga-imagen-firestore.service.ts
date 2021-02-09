import { Injectable, Output, EventEmitter } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import 'firebase/storage';

import { Observable, BehaviorSubject } from 'rxjs';
import { finalize } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CargaImagenFirestoreService {

  uploadProgress: Observable<number>;

  uploadURL: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private storage: AngularFireStorage) { }
  @Output() change: EventEmitter<boolean> = new EventEmitter();
  upload(archivo) {
    // Get input file
    //const file = archivo.target.files[0];

    // Generate a random ID
    const randomId = Math.random().toString(36).substring(2);
    console.log(randomId);
    //  const filepath = `/imagenes_perfil/${randomId}.png`;
    const filepath = `/imagenes_perfil/prueba.png`;
    const fileRef = this.storage.ref(filepath);
    const task = fileRef.put(archivo, {
      contentType: 'image/png',
    })
    // Upload Image
    //  const task = this.storage.upload(filepath, archivo);

    // Observe percentage changes
    this.uploadProgress = task.percentageChanges();

    // Get notified when the download URL is available
    task.snapshotChanges().pipe(
      finalize(() => fileRef.getDownloadURL().subscribe(d => { this.uploadURL.next(d); this.change.emit(d); })
      )).subscribe();
  }
}
