import Lap from './Lap';

/**
 * Class representing the record of a pilot inside a specific race
 */
export default class RacePilot {
	id: number;
	name: string;
	totalLaps: number;

	finishedLaps: Lap[];

	/**
	 * Constructor for class RacePilot
	 * @param id The ID number of the new pilot
	 * @param name The name of the new pilot
	 */
	constructor(id: number, name: string) {
		this.id = id;
		this.name = name;
		this.totalLaps = 0;
		this.finishedLaps = [];
	}

	/**
	 * Insert a new lap into the register of this pilot
	 * @param lapNumber The number of the lap in the race order
	 * @param lapData General data about the lap
	 */
	insertLap(lapNumber: number, lapData: Lap) {
		if (this.finishedLaps[lapNumber]) {
			throw `Duplicate registers for lap ${lapNumber} for pilot ${this.name}.`;
		}

		this.finishedLaps[lapNumber] = lapData;

		if (lapNumber > this.totalLaps) {
			this.totalLaps = lapNumber;
		}
	}

	/**
	 * Calculates the total time spent by this pilot into the race based on all laps registered
	 * @returns {Date} A datetime object containing the sum of times for all laps registered for this pilot
	 */
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