import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import 'mocha';
chai.use(chaiAsPromised);

import LogParser from '../../source/ts/LogParser'

describe('LogParser tests', () => {
	it('Should parse 23 entries from the test log file', () => {
		return LogParser.parseFile('test_logs/entrada_normalizado.txt')
			.then(entries => {
				chai.expect(entries).to.have.length(23);
			});
	});

	it('Should reject the promise if the log file isn\'t found', () => {
		chai.expect(LogParser.parseFile('jdshfkjdhsf')).to.eventually.be.rejected;
	});
});