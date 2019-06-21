/**
 * Class representing a concluded race lap
 */
export default class Lap {
	duration: Date;
	endTime: Date;
	avgSpeed: number;

	/**
	 * Constructor for class Lap
	 * @param duration Duration of the lap
	 * @param endTime Day hour when the lap was finished
	 * @param avgSpeed Car average speed when running this lap
	 */
	constructor(duration: Date, endTime: Date, avgSpeed: number) {
		this.duration = duration;
		this.endTime = endTime;
		this.avgSpeed = avgSpeed;
	}
}