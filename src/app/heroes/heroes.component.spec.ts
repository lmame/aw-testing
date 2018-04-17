import { Observable } from 'rxjs';
import { HeroService } from './../hero.service';
import { HeroesComponent } from './heroes.component';
import { of } from 'rxjs/observable/of';

describe('HeroesComponent (Isolated)', () => {
    // use this. is still better.
    let component: HeroesComponent;
    let HEROES;
    // Do not type mock as the object but any
    // let mockedService: HeroService;
    // would give an error in vscode on but execution is ok:
    // mockedService.deleteHero.and.returnValue(of(true));
    // let mockedService: any;
    // or
    let mockedService: jasmine.SpyObj<HeroService>;

    beforeEach(() => {
        HEROES = [
            {id:1, name: 'riri', strength: 10},
            {id:2, name: 'fifi', strength: 5},
            {id:3, name: 'loulou', strength: 50}
        ];

        // methods we are mocking we are going to declare them later
        mockedService = jasmine.createSpyObj(['addHero', 'deleteHero', 'getHeroes']);
        component = new HeroesComponent(mockedService);

        // .slice will actually return a clone of HEROES else when using .addHero HEROES
        // will be modified.
        mockedService.getHeroes.and.returnValue(of(HEROES.slice()));

        // should return an observable or something that has a subscribe since used in delete.
        mockedService.deleteHero.and.returnValue(of(true));

        component.ngOnInit();
    });

    it('should delete a hero', () => {
        let fallenHero = HEROES[2];

        component.delete(fallenHero);

        expect(component.heroes.length).toBe(HEROES.length - 1);
        expect(mockedService.deleteHero).toHaveBeenCalledWith(fallenHero);
    });

    it('should add hero', () => {
        let newBlood = 'Donald';

        mockedService.addHero.and.returnValue(of({id:4, name: newBlood, strenght:70}));

        component.add(newBlood);

        console.log(HEROES.length);
        expect(component.heroes.length).toBe(HEROES.length + 1);
        expect(component.heroes[3].name).toBe(newBlood);
        expect(mockedService.addHero).toHaveBeenCalled();
    });

    it('should not add hero if he has no name', () => {
        let newBlood = '';

        // mockedService.addHero.and.returnValue(of(''));
        mockedService.addHero.and.returnValue(Observable.from([]));

        component.add(newBlood);

        expect(component.heroes.length).toBe(3);
        expect(mockedService.addHero).not.toHaveBeenCalled();
    });
});