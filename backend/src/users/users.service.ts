import { Injectable } from '@nestjs/common';
import { MockService } from '../mock/mock.service';

@Injectable()
export class UsersService {
  constructor(private mockService: MockService) {}

  findAll() {
    return this.mockService.getUsers().map(u => ({ _id: u._id, email: u.email, role: u.role, name: u.name, createdAt: u.createdAt }));
  }

  findById(id: string) {
    const user = this.mockService.findUserById(id);
    if (!user) return null;
    return { _id: user._id, email: user.email, role: user.role, name: user.name };
  }

  update(id: string, data: any) {
    return { _id: id, ...data, updated: true };
  }

  delete(id: string) {
    return { deleted: true };
  }
}
