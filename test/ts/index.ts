import * as chai from 'chai';
import 'mocha';

const expect = chai.expect;

describe('Hello API Request', () => {
	it('should return response on call', () => {
		return chai.expect(1).to.eq(1);
	})
})