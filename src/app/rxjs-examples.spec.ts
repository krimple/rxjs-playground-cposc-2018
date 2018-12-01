import { Observable, from, of, interval, combineLatest } from 'rxjs';
import { map, tap, take, delay, catchError } from 'rxjs/operators';

describe('Observables can...', () => {

  xit(`should do something async and let the test
               tell you it is done`, () => {
    setTimeout(() => {
      expect(1).toBe(2);
    }, 8000);
  });

  xit('emit a stream of numbers from an array', () => {
    let results = [];
    interval(10)
      .pipe(
        tap(v => console.log(`got ${v}`)),
        take(10)
      )
      .subscribe(
        r => results = [...results, r],
        null,
        () => {
          expect(results.length).toBe(10);
          console.dir(results);
        }
     );
  });

  xit('emit a stream from an array', (done) => {
    const array = [];
    const obsNumbers$: Observable<{ num: number, captured: string}> =
      from([1, 2, 3, 4, 5])
    .pipe(
        delay(1000),
        map(num => ({ num, captured: 'yes' })),
        tap(m => console.dir(m))
    );

    obsNumbers$.subscribe(
        next => array.push(next),
        error => done.fail(error),
        () => {
          expect(array.length).toBe(5);
          done();
        }
      );
  });

  xit('can join two observable streams together', (done) => {
    const stream1$: Observable<number> =
      interval(1000).pipe(
        map(i => Math.floor(100 * Math.random())),
        tap(val => console.log(`stream1 emits ${val} at ${new Date().toLocaleTimeString()}`))
      );

    const stream2$: Observable<number> =
      interval(1500).pipe(
        map(i => Math.floor(100 * Math.random())),
        tap(val => console.log(`stream2 emits ${val} at ${new Date().toLocaleTimeString()}`))
      );

    let numResults = 0;
    combineLatest(stream1$, stream2$)
      .pipe(
        tap(d => console.log(`${JSON.stringify(d)}`)),
        take(5),
        catchError((err) => of(err))
      )
      .subscribe(
        m => {
          numResults ++;
          console.log(`merged observable got ${m} at ${new Date().toLocaleTimeString()}`);
        },
        e => {
          console.log(`ERROR ${e}`);
          done.fail(e);
        },
        () => {
          expect(numResults).toBe(5);
          done();
        }
      );
  });
});
