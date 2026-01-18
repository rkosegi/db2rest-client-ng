/*
Copyright 2026 Richard Kosegi

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

import {InExpression, JunctionExpression, NotExpression, SimpleExpression} from './query';

describe('filter expressions', () => {

  it('should correctly serialize IN expression', () => {
    let ie = new InExpression("id", [1, 2, 3])
    expect(ie.toJsonString()).toEqual('{"in":{"name":"id","val":[1,2,3]}}');
  });

  it('should correctly serialize SIMPLE expression', () => {
    let se = new SimpleExpression("age", ">", 50)
    expect(se.toJsonString()).toEqual('{"simple":{"name":"age","op":">","val":50}}');
  });

  it('should correctly serialize NOT expression', () => {
    let ne = new NotExpression(new InExpression("department", ["HR", "Eng"]))
    expect(ne.toJsonString()).toEqual('{"not":{"name":"department","val":["HR","Eng"]}}');
  });

  it('should correctly serialize JUNCTION expression', () => {
    let je = new JunctionExpression("AND", [
      new SimpleExpression("salary", ">", 100),
      new SimpleExpression("age", "<", 50)
    ])
    expect(je.toJsonString()).toEqual('{"junction":{"op":"AND","sub":[{"name":"salary","op":">","val":100},'
      + '{"name":"age","op":"<","val":50}]}}');
  });
});
