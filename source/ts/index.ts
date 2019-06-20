import Race from './Race';

let race = new Race();
race.loadFromLogFile('./test_logs/entrada_normadlizado.txt')
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
	});