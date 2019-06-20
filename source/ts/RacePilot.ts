import Lap from './Lap';

export default class RacePilot {
	id: number;
	name: string;
	totalLaps: number;

	finishedLaps: Lap[];

	constructor(id: number, name: string) {
		this.id = id;
		this.name = name;
		this.totalLaps = 0;
		this.finishedLaps = [];
	}

	insertLap(lapNumber: number, lapData: Lap) {
		if (this.finishedLaps[lapNumber]) {
			throw `Duplicate registers for lap ${lapNumber} for pilot ${this.name}.`;
		}

		this.finishedLaps[lapNumber] = lapData;

		if (lapNumber > this.totalLaps) {
			this.totalLaps = lapNumber;
		}
	}

	getTotalRaceTime(): Date {
		let total = 0;

		for (let i = 1; i <= this.totalLaps; i++){
			if (!this.finishedLaps[i]) {
				throw `Can't calculate total race time for pilot ${this.name}. Not all laps have been registered`;
			}

			total += this.finishedLaps[i].duration.getTime();
		}

		return new Date(total);
	}
}