import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';

describe('AppComponent', () => {
  beforeEach(async () => {
    // it will load component before testing with test module
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, AppRoutingModule, AppModule],
      declarations: [AppComponent],
    }).compileComponents();
  });

  // it will test our component loaded properly OR not.
  it('should create the app component and should be loaded properly.', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Estimation Calculator'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Estimation Calculator');
  });

  /* it(`should have as title 'angular'`, () => {
    const fixture = TestBed.createCompAppComponentonent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('angular');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain(
      'angular app is running!'
    );
  }); */
});
