const expect = require('expect'); 

const {isRealString} = require('../utils/validation')



describe('isRealString', () => {
    it('should reject non-string values', () => {
        
        let res = isRealString("Jio");
        expect(res).toBe(true);
    });

    it('should reject strings with only spaces', () => {

        let res = isRealString("    ");
        expect(res).toBe(false);
    });

    it('should allow strings with non-space characters', () => {
        let res = isRealString("  hey  ");
        expect(res).toBe(true);
    });
});