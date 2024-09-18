/*
 * Copyright 2023 Alexander Kiriliuk
 *
 *    Licensed under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License.
 *    You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 */

import { Controller, Get, UseGuards } from "@nestjs/common";
import { AppService } from "./app.service";
import { AuthGuard, CurrentUser, User } from "@k-platform/core";

@Controller("app")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/ping")
  async ping() {
    return { ok: 200 };
  }

  @UseGuards(AuthGuard)
  @Get("/check-access")
  async check() {
    return { ok: 200 };
  }

  @Get("/options")
  async getOptions() {
    return {
      langs: await this.appService.getAvailableLangs(),
    };
  }

  @UseGuards(AuthGuard)
  @Get("/menu")
  async getMenu(@CurrentUser() user: User) {
    return await this.appService.getCategoryTree(user, "a-menu-root");
  }

  @UseGuards(AuthGuard)
  @Get("/dirs-tree")
  async getDirsTree(@CurrentUser() user: User) {
    return await this.appService.getCategoryTree(user, "dir-struct-root");
  }
}
