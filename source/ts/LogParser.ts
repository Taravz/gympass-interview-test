import * as fs from 'fs';
import * as pathModule from 'path';
import * as readline from 'readline';

/**
 * Static class containing methods to parse a race log file
 */
export default class LogParser {
	/**
	 * Parses a text file containing the log of a race and returns an array containing an entry for each line of the
	 * log file
	 * @param filepath A relative or full path to a race log file
	 * @returns {Promise<LogEntry[]>} A promise to be resolved with an array of log entries
	 */
	static async parseFile(filepath: string): Promise<LogEntry[]> {
		let linesArray = await this.getFileLogLines(filepath);

		let entriesArray: LogEntry[] = [];

		linesArray.forEach(line => entriesArray.push(this.parseLogLine(line)));

		return entriesArray;
	}

	private static async getFileLogLines(filepath: string): Promise<string[]> {
		let linesArray: string[] = [];

		return new Promise(resolve => {
			let readInterface = readline.createInterface({
				input: fs.createReadStream(pathModule.resolve(filepath))
			});

			let firstLineIgnored = false;

			readInterface.on('line', line => {
				if (firstLineIgnored) {
					linesArray.push(line)
				} else {
					firstLineIgnored = true;
				}
			});

			readInterface.on('close', () => resolve(linesArray));
		});
	}

	private static parseLogLine(line: string): LogEntry {
		const HOUR_BEGIN = 0;
		const HOUR_LENGTH = 12;

		const ID_BEGIN = 18;
		const ID_LENGTH = 3;

		const NAME_BEGIN = 24;
		const NAME_LENGTH = 32;

		const LAPNUMBER_BEGIN = 57;
		const LAPNUMBER_LENGTH = 2;

		const LAPTIME_BEGIN = 71;
		const LAPTIME_LENGTH = 9;

		const SPEED_BEGIN = 103;
		const SPEED_LENGTH = 7;

		return {
			hour: this.parseTime(line.substr(HOUR_BEGIN, HOUR_LENGTH)),
			pilotId: parseInt(line.substr(ID_BEGIN, ID_LENGTH)),
			pilotName: line.substr(NAME_BEGIN, NAME_LENGTH).trim(),
			lapNumber: parseInt(line.substr(LAPNUMBER_BEGIN, LAPNUMBER_LENGTH)),
			lapTime: this.parseTime(line.substr(LAPTIME_BEGIN, LAPTIME_LENGTH)),
			lapAvgSpeed: parseFloat(line.substr(SPEED_BEGIN, SPEED_LENGTH).replace(',', '.'))
		};
	}

	private static parseTime(timeString: string): Date {
		let hours = 0;

		let colonSplit = timeString.split(':');
		if (colonSplit.length === 3) {
			hours = parseInt(colonSplit[0]);

			//Remove the hour from the array to allow the code below
			//to parse times both with and without hours
			colonSplit.splice(0, 1);
		}

		let dotSplit = colonSplit[1].split('.');

		let minutes = parseInt(colonSplit[0]);
		let seconds = parseInt(dotSplit[0]);
		let millis = parseInt(dotSplit[1]);

		return new Date(hours * 3600 * 1000 + minutes * 60000 + seconds * 1000 + millis);
	}
}