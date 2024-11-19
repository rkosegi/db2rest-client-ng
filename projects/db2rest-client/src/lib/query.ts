export interface ToQueryString {
  toQueryString() : string;
}

export class OrderBy implements ToQueryString {
  constructor(private name: string, private asc: boolean) {}
  public toQueryString() {
    return  encodeURIComponent(`${this.name}=${this.asc ? 'ASC' : 'DESC'}`);
  }
}

export interface QueryBase extends ToQueryString{}

export class SimpleQuery implements QueryBase{
  constructor(public name: string,public op: string, public val: any) {}

  public toQueryString() {
    return JSON.stringify({
      "simple": this
    });
  }
}

export class JunctionQuery implements QueryBase {
  constructor(public op: string, public sub: ToQueryString[]) {}

  toQueryString(): string {
    return JSON.stringify({
      "junction": this
    });
  }
}
