// model

let clubs = [{}];

// view

const clubsTable =
	document.querySelector('#clubs .tab_main table');

const [increaseClubsButton, decreaseClubsButton] =
	document.querySelectorAll('#clubs .tab_footer button');

// change number of clubs in model and view

increaseClubsButton.onclick = () => {
	clubs.push({});
	drawClubsTable();
}

decreaseClubsButton.onclick = () => {
	if(clubs.length >= 2) { clubs.pop(); }
	drawClubsTable();
}

// model to view

drawClubsTable();

function drawClubsTable() {

	clubsTable.innerHTML = clubs
		.reduce((html, club, index) => (
			html +
			getClubNameHtml(index) +
			getClubMeetingNumberHtml(index)
		), '');
}

function getClubNameHtml(i) {

	if (clubs[i].name === undefined) {
		clubs[i].name = '<club name>';
	}

	return (
		'<tr>' +
			'<td style="background-color: #CCC;"> </td>' +
			'<td style="background-color: #CCC;"> </td>' +
		'</tr>' +
		'<tr>' +
			'<td> Club ' + (i + 1) + '</td>' +
			'<td>' +
				'<input ' +
					'id="club_' + i + '_name" '+
					'onchange="changeClubName(' + i + ')" ' +
					'value="' + clubs[i].name + '"' +
				'/> '+
			'</td>' +
		'</tr>'
	);
}

function getClubMeetingNumberHtml(i) {

	if (clubs[i].meetingNumber === undefined) {
		clubs[i].meetingNumber = 0;
	}

	return (
		'<tr>' +
			'<td> Meeting # </td>' +
			'<td>' +
				'<input type="number"' +
					'id="club_' + i + '_meeting_number" ' +
					'onchange="changeClubMeetingNumber(' + i + ')"' +
					'value="' + clubs[i].meetingNumber + '"' +
				'/>'+
			'</td>' +
		'</tr>'
	);
}

// view to model

function changeClubName(i) {
	clubs[i].name =
		document.querySelector('#club_' + i + '_name').value;
}

function changeClubMeetingNumber(i) {
	clubs[i].meetingNumber =
		document.querySelector('#club_' + i + '_meeting_number').value;
}
