import * as chai from 'chai';
import 'mocha';

import RacePilot from '../../source/ts/RacePilot';
import Lap from '../../source/ts/Lap';

describe('RacePilot tests', () => {
	it('Should correctly include all needed laps in any order', () => {
		let testLap = new Lap(new Date(), new Date(), 20);

		let testPilot = new RacePilot(1, 'test');

		testPilot.insertLap(3, testLap);
		testPilot.insertLap(2, testLap);
		testPilot.insertLap(4, testLap);
		testPilot.insertLap(5, testLap);
		testPilot.insertLap(1, testLap);

		 //The array contains one empty item because the index starts on 1
		chai.expect(testPilot.finishedLaps.length).to.equal(6);
	});

	it('Should correctly calculate the amount of laps concluded based on laps numbers', () => {
		let testLap = new Lap(new Date(), new Date(), 20);

		let testPilot = new RacePilot(1, 'test');

		testPilot.insertLap(3, testLap);
		testPilot.insertLap(2, testLap);
		testPilot.insertLap(4, testLap);
		testPilot.insertLap(5, testLap);
		testPilot.insertLap(1, testLap);

		chai.expect(testPilot.totalLaps).to.equal(5);
	});

	it('Should throw an error if the same lap is included twice for the same pilot', () => {
		let testLap = new Lap(new Date(), new Date(), 20);

		let pilot = new RacePilot(1, 'test');
		pilot.insertLap(1, testLap);
		chai.expect(() => pilot.insertLap(1, testLap)).to.throw('Duplicate registers for lap 1 for pilot test.')
	});

	it('Should correctly calculate the total race time for the pilot', () => {
		let testLap1 = new Lap(new Date(80536), new Date(), 20);
		let testLap2 = new Lap(new Date(46121), new Date(), 20);
		let testLap3 = new Lap(new Date(146932), new Date(), 20);

		let testPilot = new RacePilot(1, 'test');

		testPilot.insertLap(1, testLap1);
		testPilot.insertLap(2, testLap2);
		testPilot.insertLap(3, testLap3);

		chai.expect(testPilot.getTotalRaceTime().getTime()).to.equal(273589);
	});

	it('Should throw an error when trying to calculate total race time with some laps missing', () => {
		let testLap = new Lap(new Date(), new Date(), 20);

		let testPilot = new RacePilot(1, 'test');

		testPilot.insertLap(3, testLap);
		testPilot.insertLap(2, testLap);
		testPilot.insertLap(5, testLap);

		chai.expect(() => testPilot.getTotalRaceTime())
			.to.throw('Can\'t calculate total race time for pilot test. Not all laps have been registered');
	});

});