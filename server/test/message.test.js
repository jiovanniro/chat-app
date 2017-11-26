const expect = require('expect');


const {generateMessage} = require('../utils/message')
describe('generateMessage', () => {

    it ('should generate correct message object', () => {
        let from = 'Josh'; 
        let text = 'A cool message';
        
        let message = generateMessage(from, text);

        expect(message).toInclude({from, text});  
        expect(message.createdAt).toBeA('number');
        
    });
});