export interface QuerySerializer {
  // emits JSON-serialized query string
  toJsonString() : string;
}

export class OrderBy implements QuerySerializer {
  constructor(private name: string, private asc: boolean) {}
  public toJsonString() {
    return  encodeURIComponent(`${this.name}=${this.asc ? 'ASC' : 'DESC'}`);
  }
}

export interface FilterExpression extends QuerySerializer{}

export class SimpleExpression implements FilterExpression{
  constructor(public name: string,public op: string, public val: any) {}

  public toJsonString() {
    return JSON.stringify({
      "simple": this
    });
  }
}

export class JunctionExpression implements FilterExpression {
  constructor(public op: string, public sub: QuerySerializer[]) {}

  toJsonString(): string {
    return JSON.stringify({
      "junction": this
    });
  }
}

export class NotExpression implements FilterExpression {
  constructor(public sub: FilterExpression) {}

  toJsonString(): string {
    return JSON.stringify({
      "not": this.sub
    })
  }
}

export class InExpression implements FilterExpression {
  constructor(public name: string, public val: any[]) {}

  toJsonString(): string {
    return JSON.stringify({
      "in": this
    })
  }
}
