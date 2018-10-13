

export class  CrossRequestAcumulator {
  public  accumulatedPostViews: Array<number>;
  public  accumulatedPostVotes: Array<number>;

  constructor() {
    this.accumulatedPostViews = [];
    this.accumulatedPostVotes = [];
  }
  public pushView(postHandle: string): number {
    if (!this.accumulatedPostViews[postHandle])
      this.accumulatedPostViews[postHandle] = 0;
    return ++this.accumulatedPostViews[postHandle];
  }
  public viewsCommited(postHandle: string): void {
    this.accumulatedPostViews[postHandle] = 0;
    delete this.accumulatedPostViews[postHandle];
  }

  public pushVotes(postHandle: string,value:number): number {
    if (!this.accumulatedPostVotes[postHandle])
      this.accumulatedPostVotes[postHandle] = 0;
    this.accumulatedPostVotes[postHandle] += value;
    return this.accumulatedPostVotes[postHandle];
  }

  public votesCommited(postHandle: string): void {
    delete this.accumulatedPostVotes[postHandle];
  }
}

const acumulator = new CrossRequestAcumulator();
export default acumulator;

