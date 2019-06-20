import LogParser from './LogParser';

LogParser.parseFile('./test_logs/entrada_normalizado.txt')
	.then(logEntries => console.log(logEntries));