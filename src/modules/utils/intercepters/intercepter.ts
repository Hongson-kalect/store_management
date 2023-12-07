import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { CustomRequest } from 'src/interfaces/global.type';
import { HistoryRequestService } from 'src/modules/historyRequest/historyRequest.service';

@Injectable()
export class InterCeptor implements NestInterceptor {
  constructor(private historyRequestService: HistoryRequestService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    console.log('where this is');
    const ctx = context.switchToHttp();
    // const response = ctx.getResponse();
    const request: CustomRequest = ctx.getRequest();
    // console.log(request.body);
    // console.log(request.url);
    // console.log(request.baseUrl);
    // console.log(request.originalUrl);
    const requestParams = {
      body: request.body,
      params: request.params,
      query: request.query,
    };

    const requestId = await this.historyRequestService.createRequestHistory({
      url: request.url,
      params: JSON.stringify(requestParams),
    });

    // response.on('close', async () => {

    // });

    return next.handle().pipe(
      tap(async (responseBody) => {
        console.log('cc');
        if (responseBody)
          await this.historyRequestService.requestSuccess(requestId);
      }),
    );
  }
}
