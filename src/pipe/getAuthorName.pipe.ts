import { Pipe, PipeTransform } from '@angular/core';
import { StoreService } from '../app/home/store/store.service';

@Pipe({ name: 'getAuthorName' })
export class GetAuthorNamePipe implements PipeTransform {
  constructor(private store: StoreService) {}

  transform(value: number, args: any[] = []) {
    const tempObj = this.store.getUserById(value);
    if (tempObj) {
      return tempObj.name;
    }

    return 'No Details Found';
  }
}
