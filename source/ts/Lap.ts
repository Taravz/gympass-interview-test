export default class Lap {
	duration: Date;
	endTime: Date;
	avgSpeed: number;

	constructor(duration: Date, endTime: Date, avgSpeed: number) {
		this.duration = duration;
		this.endTime = endTime;
		this.avgSpeed = avgSpeed;
	}
}