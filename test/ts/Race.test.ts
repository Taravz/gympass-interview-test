import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import 'mocha';
chai.use(chaiAsPromised);

import Race from '../../source/ts/Race'

describe('Race tests', () => {
	it('Should parse 4 different pilots from the test log file', () => {
		let race = new Race();

		race.loadFromLogFile('test_logs/entrada_normalizado.txt')
			.then(() => {
				chai.expect(race.pilots).to.have.length(6);
			});
	});

	it('Should correctly rank the pilots by total race time', () => {
		let correctPilotsOrder = [38, 2, 33, 23, 15, 11];

		let race = new Race();

		race.loadFromLogFile('test_logs/entrada_normalizado.txt')
			.then(() => {
				let ranking = race.getRanking();

				ranking.forEach((pilot, index) => {
					chai.expect(pilot.id).to.equal(correctPilotsOrder[index]);
				});
			});
	});
});