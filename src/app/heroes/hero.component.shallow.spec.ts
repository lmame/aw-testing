import {HeroComponent} from './../hero/hero.component';
import {TestBed, ComponentFixture} from '@angular/core/testing';
import {ProviderAst} from '@angular/compiler';
import {NO_ERRORS_SCHEMA, DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';

/*
Shallow:
    mock everything that is not the class
Deep:
    all components and routing

TestBed to compile components
inject()

For aync callbacks:
    async()
    fakeAsync() / tick()
*/

describe('HeroComponent (Integration)', () => {
  let fixture: ComponentFixture<HeroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeroComponent],
      // To avoid angular complaining about missing routerLink
      // Can't bind to 'routerLink' since it isn't a known property of 'a'
      schemas: [NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(HeroComponent);
    // Or like that so vscode doesn't complain
    // But this doesn't give us intellisense anyway
    // Typing this. doesn't even give us fixture2 in the list.
    // this.fixture2 = <ComponentFixture<HeroComponent>> TestBed.createComponent(HeroComponent);
  });

  it('should have the correct hero', () => {
    let componentInstance = fixture.componentInstance;

    componentInstance.hero = {id: 1, name: 'riri', strength: 10};

    expect(componentInstance.hero.name).toBe('riri');
  });

  it('should put the here name in anchor tag', () => {
    let componentInstance = fixture.componentInstance;

    componentInstance.hero = {id: 1, name: 'riri', strength: 10};
    // Needed to force / apply the changes
    fixture.detectChanges();

    // Casting for intellisense
    let de: DebugElement = fixture.debugElement.query(By.css('a'));
    let ne: HTMLElement = de.nativeElement;

    expect(ne.textContent).toContain(componentInstance.hero.name);
  });

  it('should get the id', () => {
    let componentInstance = fixture.componentInstance;

    componentInstance.hero = {id: 1, name: 'riri', strength: 10};
    // Needed to force / apply the changes
    fixture.detectChanges();

    // Casting for intellisense
    // Here we are looking for a class.
    // <span class="badge">{{hero.id}}</span>
    let de: DebugElement = fixture.debugElement.query(By.css('.badge'))
    let ne: HTMLElement = de.nativeElement;

    expect(ne.textContent).toBe(componentInstance.hero.id.toString());
  });
});
