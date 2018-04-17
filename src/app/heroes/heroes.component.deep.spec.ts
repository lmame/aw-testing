import { Hero } from './../hero';
// Deep: We do mock up dependencies
// we are in HeroesComponent and will use real HeroComponent rather than
// using mockups like we did in heroes.component.shallow.spec.ts.
import { HeroComponent } from './../hero/hero.component';
import { HeroService } from './../hero.service';
import { HeroesComponent } from './heroes.component';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, Input, Component, DebugElement } from '@angular/core';
import { of } from 'rxjs/observable/of';
// We import those two imports rather than this too generic:
// import { Observable } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import { By } from '@angular/platform-browser';
import { first } from 'rxjs/operator/first';
// for:
// mockedService.getHeroes.and.returnValue(Observable.from([HEROES]));

fdescribe('HeroesComponent (Deep)', () => {
    let fixture: ComponentFixture<HeroesComponent>;
    let HEROES;
    let mockedService: jasmine.SpyObj<HeroService>;

    beforeEach(() => {
        HEROES = [
            { id: 1, name: 'riri', strength: 10 },
            { id: 2, name: 'fifi', strength: 5 },
            { id: 3, name: 'loulou', strength: 50 }
        ];

        // Here we are going to mock only getHeroes method,
        // Implementation is in it.
        mockedService = jasmine.createSpyObj(['getHeroes', 'deleteHero']);

        TestBed.configureTestingModule({
            declarations: [HeroesComponent, HeroComponent],
            // we tell to use mockedService instead of HeroService
            providers: [{
                provide: HeroService, useValue: mockedService
            }],
            // to avoid error on missing routerLink
            // Can't bind to 'routerLink' since it isn't a known property of 'a'. ("<a [ERROR ->]routerLink="/detail/{{hero.id}}">
            schemas: [NO_ERRORS_SCHEMA]
        });

        fixture = TestBed.createComponent(HeroesComponent);
    });

    describe('initial rendering', () => {
        it('should render each hero as a hero component', () => {
            // Implementation of getHeroes from our mocked service
            // mockedService.getHeroes.and.returnValue(of(HEROES));
            // Or
            mockedService.getHeroes.and.returnValue(Observable.from([HEROES]));

            // To do only after sets
            fixture.detectChanges();

            // Return all HeroComponents
            let allComponents: DebugElement[] = fixture.debugElement.queryAll(By.directive(HeroComponent));
            // first DOM Onject
            let firstElement: HTMLElement = allComponents[0].nativeElement;

            expect(allComponents.length).toBe(HEROES.length);

            for (let i = 0; i < HEROES.length; i++) {
                // digging into Component instance
                let instance = allComponents[i].componentInstance;

                expect(instance.hero).toBe(HEROES[i]);

                // digging into the html
                let el: HTMLElement = allComponents[i].nativeElement;

                expect(el.textContent).toContain(HEROES[i].name);
            }

            // Changing state again (bad pracice, just an example)
            // We change the name in the first instance of HeroComponent and check
            // that html is updated.
            allComponents[0].componentInstance.hero.name = 'Bob';
            fixture.detectChanges();

            let el: HTMLElement = allComponents[0].nativeElement;

            expect(el.textContent).toContain('Bob');
        });

        it('should delete the hero when clicking the delete button', () => {
            // We click in a app-hero component (HeroComponent).
            // <button class="delete" (click)="onDeleteClick($event)">x</button>
            // delete is:
            //   delete(hero: Hero): void {
            mockedService.getHeroes.and.returnValue(Observable.from([HEROES]));
            // implementation of deleteHero in the mocked Service
            mockedService.deleteHero.and.returnValue(of(true));

            // To do only after sets
            fixture.detectChanges();

            // we spy the delete from HeroesComponent
            spyOn(fixture.componentInstance, 'delete').and.callThrough();

            // Return all HeroComponents
            let allComponents: DebugElement[] = fixture.debugElement.queryAll(By.directive(HeroComponent));
            // Clicking on button
            allComponents[0].query(By.css('button')).triggerEventHandler('click', { stopPropagation: () => { } });
            // You need to launch test without source maps else you will have weird errors like:
            // Cross origin requests are only supported for protocol schemes: http, data, chrome, chrome-extension, https.
            // See other file to see how to do in package.json or use:
            // ng test --sm false

            expect(fixture.componentInstance.delete).toHaveBeenCalled();
        });

        it('should should call deleteHero when delete button is clicked', () => {
            // We click in a app-hero component (HeroComponent).
            // <button class="delete" (click)="onDeleteClick($event)">x</button>
            // delete is:
            //   delete(hero: Hero): void {
            mockedService.getHeroes.and.returnValue(Observable.from([HEROES]));
            // implementation of deleteHero in the mocked Service
            mockedService.deleteHero.and.returnValue(of(true));

            // To do only after sets
            fixture.detectChanges();

            // we spy the delete from HeroesComponent
            spyOn(fixture.componentInstance, 'delete').and.callThrough();

            // Return all HeroComponents
            let allComponents: DebugElement[] = fixture.debugElement.queryAll(By.directive(HeroComponent));

            // We don't click on a button we emit an Event.
            allComponents[0].triggerEventHandler('delete', null);

            expect(fixture.componentInstance.delete).toHaveBeenCalled();
        });
    });
});