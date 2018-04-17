import { HeroService } from './../hero.service';
import { HeroesComponent } from './heroes.component';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, Input, Component } from '@angular/core';
import { of } from 'rxjs/observable/of';


describe('HeroesComponent (Integration)', () => {
    let fixture: ComponentFixture<HeroesComponent>;
    let HEROES;
    let mockedService: jasmine.SpyObj<HeroService>;

    // See below why we mock the component.
    @Component({
        selector: 'app-hero',
        template:'<div></div>'
    })
    class MockHeroComponent {
        @Input() hero;
    }

    beforeEach(() => {
        HEROES = [
            {id:1, name: 'riri', strength: 10},
            {id:2, name: 'fifi', strength: 5},
            {id:3, name: 'loulou', strength: 50}
        ];

        // Here we are going to mock only getHeroes method,
        // Implementation is in it.
        mockedService = jasmine.createSpyObj(['getHeroes']);

        // To avoid error:
        // Can't bind to 'hero' since it isn't a known property of 'app-hero'.
        // We can use 
        // schemas: [NO_ERRORS_SCHEMA]
        // Or mock the Hero component app-hero
        TestBed.configureTestingModule({
            declarations: [HeroesComponent, MockHeroComponent],
            // we tell to use mockedService instead of HeroService
            providers: [{
                provide: HeroService, useValue: mockedService
            }]
            //,
            // schemas: [NO_ERRORS_SCHEMA]
        });

        fixture = TestBed.createComponent(HeroesComponent);
    });

    describe('ngOnInit', () => {
        it('should set heroes correclty from server', () => {
            // Implementation of getHeroes from our mocked service
            mockedService.getHeroes.and.returnValue(of(HEROES));

            // To do only after sets
            fixture.detectChanges();

            expect(fixture.componentInstance.heroes.length).toBe(HEROES.length);
        });
    });
});
