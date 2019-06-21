import Race from './Race';

let race = new Race();
race.loadFromLogFile('./test_logs/entrada_normalizado.txt')
	.then(() => {
		let ranking = race.getRanking();

		ranking.forEach((pilot, index) => {
			let raceTime = pilot.getTotalRaceTime();
			let timeString = `${raceTime.getUTCHours().toString().padStart(2, '0')}`;
			timeString += `:${raceTime.getUTCMinutes().toString().padStart(2, '0')}`;
			timeString += `:${raceTime.getUTCSeconds().toString().padStart(2, '0')}`;
			timeString += `.${raceTime.getUTCMilliseconds().toString().padStart(3, '0')}`;

			console.log(`${index + 1} - ${pilot.name.padEnd(33, ' ')} ${pilot.totalLaps} laps - ${timeString}`);
		});
	})
	.catch((ex: any) => {
		if (typeof ex.message === 'string') {
			console.error(ex.message);
		} else {
			console.error(ex);
		}

		console.error('Failed to load race data. Please check the log file and try again');
	});