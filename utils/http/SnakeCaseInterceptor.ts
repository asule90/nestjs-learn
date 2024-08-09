import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { snakeCase, isObject, transform } from 'lodash';

@Injectable()
export class SnakeCaseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => this.convertKeysToSnakeCase(data)),
    );
  }

  private convertKeysToSnakeCase(obj: any): any {
    if (Array.isArray(obj)) {
      return obj.map((item) => this.convertKeysToSnakeCase(item));
    } else if (isObject(obj) && !(obj instanceof Date)) {
      return transform(obj, (result: any, value: any, key: string) => {
        result[snakeCase(key)] = this.convertKeysToSnakeCase(value);
      });
    }
    return obj;
  }
}
