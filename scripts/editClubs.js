// model

let clubs = [{
	name:
		DEFAULTS.CLUB_NAME,
	meetingNumber:
		DEFAULTS.CLUB_MEETING_NUMBER
}];

// view

const clubsTable =
	document.querySelector('#clubs .tab_main table');

const [
	clubsIncreaseButton,
	clubsDecreaseButton
] =
	document.querySelectorAll('#clubs .tab_footer button');

// add club to model and update view

clubsIncreaseButton.onclick = () => {

	const newClub = {
		name:
			DEFAULTS.CLUB_NAME,
		meetingNumber:
			DEFAULTS.CLUB_MEETING_NUMBER
	};

	clubs.push(newClub);
	clubsToTable();
}

// if at least 2 clubs, remove club from model and update view

clubsDecreaseButton.onclick = () => {

	if (clubs.length >= 2) {
		clubs.pop();
		clubsToTable();
	}
}

// model to view

clubsToTable();

function clubsToTable() {

	clubsTable.innerHTML = clubs.reduce((html, club, index) => (
			html +
			((index > 0) ? '<tr> <td style="opacity:0"> </td> </tr>' : '') +
			clubNameToRow(index) +
			clubMeetingNumberToRow(index)
		),
		''
	);
}

function clubNameToRow(i) {

	return (
		'<tr>' +
			'<td>' +
				'<span class="cell_header"> Club ' + (i + 1) + ' </span> <br/>' +
				'<input class="club_name" onchange="rowToClubName(' + i + ')" value="' + clubs[i].name + '"/> ' +
			'</td>' +
		'</tr>'
	);
}

function clubMeetingNumberToRow(i) {

	return (
		'<tr>' +
			'<td>' +
				'<span class="cell_header"> Meeting # </span> <br/>' +
				'<input class="club_meeting_number" onchange="rowToClubMeetingNumber(' + i + ')" value="' + clubs[i].meetingNumber + '" type="number"/> ' +
			'</td>' +
		'</tr>'
	);
}

// view to model

function rowToClubName(i) {
	clubs[i].name =
		document.querySelectorAll('.club_name')[i].value;
}

function rowToClubMeetingNumber(i) {
	clubs[i].meetingNumber =
		document.querySelectorAll('.club_meeting_number')[i].value;
}
