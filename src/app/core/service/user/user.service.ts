import { Injectable } from '@angular/core';
import { ApiService } from '../api';
import { User } from '../../../_models';

@Injectable()
export class UserService {

  constructor(private api: ApiService) { }

  getAll() {
    return this.api.get('users')
      .subscribe(users => console.log(users));
  }

  getById(id: number) {
    return this.api.get('users/' + id)
      .subscribe(user => console.log(user));
  }

  create(user: User) {
    return this.api.post('user/add', JSON.stringify(user))
      .subscribe(user => console.log(user));
  }

  update(user: User) {
    return this.api.put('users/' + user.id, JSON.stringify(user))
      .subscribe(user => console.log(user));
  }

  delete(id: number) {
    return this.api.delete('users/' + id)
      .subscribe(user => console.log(user));
  }

}
