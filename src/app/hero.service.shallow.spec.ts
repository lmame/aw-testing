// // https://offering.solutions/blog/articles/2017/10/02/testing-angular-2-http-service/
// import { TestBed } from "@angular/core/testing";
// import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

// // See solution.
// // As in angularjs we have $httpBackend we have HttpTestingController

// xdescribe('HerService (Shallow)', () => {
//     let httpTestingController = TestBed.get(HttpTestingController);

//     // Data returned by the mocked up get
//     let testData = {id:4, name: 'riri', strength: 20};

//     // service is a HeroService
//     service.getHero(4).subscribe(hero => {
//         console.log(hero);
//     });

//     const req = httpTestingController.expectOne('api/heroes/4');
//     req.flush(testData);
//     httpTestingController.verify();
// });



