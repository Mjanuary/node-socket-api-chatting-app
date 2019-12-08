let expect = require('expect');

var {generateMessage} = require('./message');

describe('Generate Message', () => {
    it("should generate correct message object", () => {
        let from = "WDJ",
            text = "some random",
            message = generateMessage(from,text);

        expect(typeof message.createdAt).toBe('number');
        expect(typeof message).toMatchObject({from, text});
    });
});