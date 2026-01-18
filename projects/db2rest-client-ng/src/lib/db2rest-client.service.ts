/*
Copyright 2025 Richard Kosegi

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import { Injectable } from '@angular/core';
import { OrderBy, FilterExpression} from './query'
@Injectable({
  providedIn: 'root'
})
export class Db2restClientService {

  constructor() { }

  searchQuery(orders: OrderBy[], pageSize: number, pageOffset: number, query :FilterExpression|null) : string {
    let parts: string[]  = [];
    parts = parts.concat(...orders.map((o, i, arr) => {
      return `order[]=${o.toJsonString()}`
    }));
    if (pageSize > 0) {
      parts.push(`page-size=${pageSize}`)
    }
    if (pageOffset > 0) {
      parts.push(`page-offset=${pageOffset}`);
    }
    if (query != null) {
      parts.push(`filter=${query.toJsonString()}`);
    }
    return parts.join("&");
  }
}
