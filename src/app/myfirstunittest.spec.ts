
describe('my first unit test', () => {
    let obj: any;

    beforeEach(() => {
        obj = {};
    });

    it('should be true if true', () => {
        // Initial value
        obj.a = false;

        // Setting to true
        obj.a = true;

        expect(obj.a).toBeTruthy();
        expect(obj.a).toBe(true);
    });
});