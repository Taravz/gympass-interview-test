/**
 * Interface for objects containing the data of one line of a log file
 * @interface LogEntry
 */
export default interface LogEntry {
	hour: Date;
	pilotId: number;
	pilotName: string;
	lapNumber: number;
	lapTime: Date;
	lapAvgSpeed: number;
}