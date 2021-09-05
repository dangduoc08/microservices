import {
  HttpService
} from '@nestjs/axios'
import {
  Observable
} from 'rxjs'
import {
  AxiosResponse
} from 'axios'
import {
  UsersModel
} from './users.model'

export class UsersService {
  constructor(
    private readonly httpService: HttpService,
    private readonly url: string
  ) {
    this.httpService = httpService
    this.url = url
  }

  public getUserById(id: string): Observable<AxiosResponse<{ user: UsersModel }>> {
    return this.httpService.get<{ user: UsersModel }>(`${this.url}/users/${id}`)
  }
}