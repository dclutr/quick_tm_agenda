// model

const meeting = {
	theme:
		DEFAULTS.THEME,
	venue:
		DEFAULTS.VENUE,
	date:
		DEFAULTS.DATE,
	joinByTime:
		DEFAULTS.JOIN_BY_TIME,
	startTime:
		DEFAULTS.START_TIME,
	stopTime:
		DEFAULTS.STOP_TIME,
}

// view

const meetingInputs = {};

let i = 0;

for (let property of ['theme', 'venue', 'date', 'joinByTime', 'startTime', 'stopTime']) {


	meetingInputs[property] =
		document.querySelectorAll('#theme_venue_time .tab_main table tr td input')[i];

	meetingInputs[property].onchange =
		() => inputToMeeting(property);

	i++;
}

// view to model

function inputToMeeting(property) {
	meeting[property] = meetingInputs[property].value
}
