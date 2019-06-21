import LogParser from './LogParser'
import RacePilot from './RacePilot'
import Lap from './Lap';

/**
 * Class containing all data about a race
 */
export default class Race {
	pilots: RacePilot[];

	/**
	 * Default constructor for class Race
	 */
	constructor() {
		this.pilots = [];
	}

	/**
	 * Loads pilots and laps records from a log file
	 * @param logFilepath A relative or absolute path to the location of the log file
	 * @returns A promise which will be resolved when all data are read and parsed from the log file
	 */
	async loadFromLogFile(logFilepath: string): Promise<void> {
		let logEntries = await LogParser.parseFile(logFilepath);

		logEntries.forEach(entry => {
			let pilot = this.getPilot(entry.pilotId);

			if (!pilot) {
				pilot = new RacePilot(entry.pilotId, entry.pilotName);
				this.pilots.push(pilot);
			}

			let lapData = new Lap(entry.lapTime, entry.hour, entry.lapAvgSpeed);
			pilot.insertLap(entry.lapNumber, lapData);
		});
	}

	/**
	 * Returns the records for a specific pilot participating in this race
	 * @param id The id of the pilot
	 * @returns The data of the desired pilot
	 */
	getPilot(id: number): RacePilot {
		for (let i = 0; i < this.pilots.length; i++) {
			if (this.pilots[i].id === id) {
				return this.pilots[i];
			}
		}

		return null;
	}

	/**
	 * Returns an array containing all pilots of the race sorted by ascending race position
	 * @returns The sorted array of pilots
	 */
	getRanking(): RacePilot[] {
		this.pilots.sort((a, b) => a.getTotalRaceTime().getTime() - b.getTotalRaceTime().getTime());

		return this.pilots;
	}
}