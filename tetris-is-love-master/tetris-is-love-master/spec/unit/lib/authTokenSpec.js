import {generateToken, decodeToken} from '../../../app/lib/authToken';

const fooToken = generateToken('foo');
const otherFooToken = generateToken('foo');
const barToken = generateToken('bar');

describe('Lib: authToken', () => {
    it('should be able to generateToken', () => {
        expect(fooToken).toEqual(otherFooToken);
        expect(fooToken).not.toEqual(barToken);
    });

    it('should be able to decodeToken', () => {
        [fooToken, otherFooToken, barToken]
            .forEach(t => expect(decodeToken(t)).toBeDefined());

        ['', {}, null, 'pew', 'sdfsdf.sdfsdf.sdfdsf.sdfsdf']
            .forEach(t => expect(decodeToken(t)).not.toBeDefined());
    });
});
