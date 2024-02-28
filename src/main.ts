import { NestFactory } from '@nestjs/core';
import * as admin from 'firebase-admin';
import { Request, Response } from 'express';
import { Injectable, Module } from '@nestjs/common';
import { AppModule } from './app.module';

export { admin, Request, Response, Injectable, Module };

async function bootstrap() {
  const port = process.env.PORT || 3001;
  const app = await NestFactory.create(AppModule);
  await app.listen(port);
}
bootstrap();
