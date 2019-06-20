import LogParser from './LogParser'
import RacePilot from './RacePilot'
import Lap from './Lap';

export default class Race {
	pilots: RacePilot[];

	constructor() {
		this.pilots = [];
	}


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

	getPilot(id: number): RacePilot {
		for (let i = 0; i < this.pilots.length; i++) {
			if (this.pilots[i].id === id) {
				return this.pilots[i];
			}
		}

		return null;
	}

	getRanking(): RacePilot[] {
		this.pilots.sort((a, b) => a.getTotalRaceTime().getTime() - b.getTotalRaceTime().getTime());

		return this.pilots;
	}
}