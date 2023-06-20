import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { UseGlobalHttpFilter } from './use.global.exception';

@Module({
  providers: [
    {
      provide: APP_FILTER,
      useClass: UseGlobalHttpFilter,
    },
  ],
})
export class HttpExceptionModule {}
