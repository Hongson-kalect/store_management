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
    const ctx = context.switchToHttp();
    // const response = ctx.getResponse();
    const request: CustomRequest = ctx.getRequest();
    const requestParams = {
      body: request.body,
      params: request.params,
      query: request.query,
    };

    const requestId = await this.historyRequestService.createHistoryRequest({
      url: request.url,
      params: JSON.stringify(requestParams),
    });

    // response.on('close', async () => {

    // });

    return next.handle().pipe(
      tap(async (responseBody) => {
        if (responseBody)
          await this.historyRequestService.requestSuccess(requestId);
      }),
    );
  }
}
