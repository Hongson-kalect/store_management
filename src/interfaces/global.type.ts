export enum ResponseStatus {
  SUCCESS = 200,
  ERROR = 404,
}
export enum ResponseMessage {
  SUCCESS = 'Requestion successful',
  ERROR = 'Requestion error',
}

export class ResponseData<T> {
  data: T;
  status: ResponseStatus;
  message: ResponseMessage;
  constructor(data: T, status: ResponseStatus, message: ResponseMessage) {
    this.data = data;
    this.status = status;
    this.message = message;
  }
}
