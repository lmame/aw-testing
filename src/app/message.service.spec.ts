import {MessageService} from './message.service';

describe('Strength pipe', () => {
    let service: MessageService;
    let message = 'Hello World';

    beforeEach(() => {
        service = new MessageService();
    });

    it('should have no messages to start', () => {
        expect(service.messages.length).toBe(0);
    });

    it('should add a message to the message list', () => {
        service.add(message);

        expect(service.messages.length).toBe(1);
        expect(service.messages[0]).toBe(message);
    });

    it('should clear all messages', () => {
        service.messages.push(message);

        expect(service.messages.length).toBe(1);
        
        service.clear();

        expect(service.messages.length).toBe(0);
    });
});