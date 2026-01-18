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

import { TestBed } from '@angular/core/testing';

import { Db2restClientService } from './db2rest-client.service';
import {SimpleExpression} from "./query";

describe('Db2restClientService', () => {
  let service: Db2restClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Db2restClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should serialize search query', () => {
    expect(service.searchQuery([], 20, 140,
      new SimpleExpression("state", "=", "done"))).
    toEqual('page-size=20&page-offset=140&filter={"simple":{"name":"state","op":"=","val":"done"}}' );
  });
});
