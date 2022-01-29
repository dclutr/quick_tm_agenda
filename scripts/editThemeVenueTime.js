// model

const meeting = {
	theme: null,
	venue: null,
	date: null,
	joinByTime: null,
	startTime: null,
	stopTime: null,
}

// view

const [themeInput, venueInput, dateInput, joinByTimeInput, startTimeInput, stopTimeInput] =
	document.querySelectorAll('#theme_venue_time .tab_main table tr td input');

// view to model

initializeThemeVenueTime();

function initializeThemeVenueTime() {

	changeTheme();
	changeVenue();
	changeDate();
	changeJoinByTime();
	changeStartTime();
	changeStopTime();

	[
		themeInput.onchange,
		venueInput.onchange,
		dateInput.onchange,
		joinByTimeInput.onchange,
		startTimeInput.onchange,
		stopTimeInput.onchange
	] =
		[changeTheme, changeVenue, changeDate, changeJoinByTime, changeStartTime, changeStopTime];
}

function changeTheme() {
	meeting.theme = themeInput.value;
	meeting.venue =
		(venueInput.value !== undefined)
			? venueInput.value
			: '<theme>';
};

function changeVenue () {
	meeting.venue =
		(venueInput.value !== undefined)
			? venueInput.value
			: 'Online';
};

function changeDate() {
	meeting.date =
		(dateInput.value !== undefined)
			? dateInput.value
			: '2001-01-01';
};

function changeJoinByTime() {
	meeting.joinByTime =
		(joinByTimeInput.value !== undefined)
			? joinByTimeInput.value
			: '00:00';
};

function changeStartTime() {
	meeting.startTime =
		(startTimeInput.value !== undefined)
			? startTimeInput.value
			: '12:00';
};

function changeStopTime() {
	meeting.stopTime =
		(stopTimeInput.value !== undefined)
			? stopTimeInput.value
			: '23:59';
};
