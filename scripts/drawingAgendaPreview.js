// canvas context

const ctx =
	agendaPreviewCanvas.getContext('2d');

// constants

const NORMALIZED_Y_INCREMENTS = {
	TOP_TO_CLUBS:						0.08,
	CLUBS:								0.04,
	CLUBS_TO_THEME_VENUE_TIME:			0.03,
	THEME_VENUE_TIME:					0.03,
	THEME_VENUE_TIME_TO_TABLE_HEADER:	0.06,
	TABLE_HEADER_TO_PLAN_ITEMS:			0.04,
	PLAN_ITEMS:							0.04,
	PLAN_ITEMS_TO_TABLE_FOOTER:			0.02,
	TABLE_FOOTER:						0.03
};

const NORMALIZED_FONT_SIZES = {
	CLUBS:								0.04,
	THEME_VENUE_TIME:					0.020,
	TABLE_HEADER:						0.020,
	PLAN_ITEMS:							0.018,
	TABLE_FOOTER:						0.018
};

// agenda size

let agendaSize =
	{x:0, y:0};

// coordinates on canvas

let size =
	{x:0, y:0};

let position =
	{x:0, y:0};

// coordinates on canvas for table

let tableMargin;
let columnXSizes = [];
let columnXPositions = [];

// model to view

function drawAgendaPreviewCanvas() {

	addAgendaBackground();
	addClubs();
	addThemeVenueTime();
	addTable();
}

function addAgendaBackground() {

	// calculate agenda width and height

	agendaSize.x =
		screen.width - 2 * AGENDA_MARGIN;

	agendaSize.y = (
		NORMALIZED_Y_INCREMENTS.TOP_TO_CLUBS +
		NORMALIZED_Y_INCREMENTS.CLUBS * clubs.length +
		NORMALIZED_Y_INCREMENTS.CLUBS_TO_THEME_VENUE_TIME +
		NORMALIZED_Y_INCREMENTS.THEME_VENUE_TIME * 2 +
		NORMALIZED_Y_INCREMENTS.THEME_VENUE_TIME_TO_TABLE_HEADER +
		NORMALIZED_Y_INCREMENTS.TABLE_HEADER_TO_PLAN_ITEMS +
		NORMALIZED_Y_INCREMENTS.PLAN_ITEMS * (plan.length + 2) +
		NORMALIZED_Y_INCREMENTS.PLAN_ITEMS_TO_TABLE_FOOTER +
		NORMALIZED_Y_INCREMENTS.TABLE_FOOTER * 4
	) * agendaSize.x;

	// apply agenda width and height

	[agendaPreviewCanvas.width, agendaPreviewCanvas.height] =
		['' + agendaSize.x, '' + agendaSize.y];

	// white background

	ctx.fillStyle = 'white';
	ctx.fillRect(0, 0, agendaSize.x, agendaSize.y);
}

function addTMLogo() {

	const IMAGE_URL =
		'https://toastmasterscdn.azureedge.net' +
		'/medias/images/brand-items/logos-and-wordmarks/toastmasters-logo-color-png.png';

	const image = new Image();

	// image size and position

	size.x =
		0.10 * agendaSize.x;

	size.y =
		(1496 / 1803) * size.x;

	position.x =
		0.05 * agendaSize.x;

	position.y = y - size.y / 2;

	// once image loaded, draw it on the canvas

	image.addEventListener(
		'load',
		function() {
			ctx.drawImage(image, position.x, position.y, size.x, size.y);
		},
		false
	);

	image.src = IMAGE_URL;
}

function addClubs() {

	x =
		0.50 * agendaSize.x;

	y =
		NORMALIZED_Y_INCREMENTS.TOP_TO_CLUBS *
		agendaSize.x;

	// text styling

	ctx.fillStyle = '#004165';
	ctx.font = '' + (NORMALIZED_FONT_SIZES.CLUBS * agendaSize.x) + 'px serif';
	ctx.textAlign = 'center';

	for (let club of clubs) {

		const clubAsText = "" +
			club.name + "'s " +
			club.meetingNumber + numberPostfix(club.meetingNumber) + ' meeting';

		ctx.fillText(clubAsText, x, y);

		y +=
			NORMALIZED_Y_INCREMENTS.CLUBS *
			agendaSize.x;
	}
}

function addThemeVenueTime() {

	y +=
		NORMALIZED_Y_INCREMENTS.CLUBS_TO_THEME_VENUE_TIME *
		agendaSize.x;

	ctx.fillStyle = 'black';
	ctx.font = '' + (NORMALIZED_FONT_SIZES.THEME_VENUE_TIME * agendaSize.x) + 'px serif';
	ctx.textAlign = 'center';

	const venueDateTimeAsText =
		meeting.venue + ' | ' + meeting.date + ' | ' + meeting.startTime + '-' + meeting.stopTime;

	ctx.fillText(venueDateTimeAsText, x, y);

	addTMLogo();

	y +=
		NORMALIZED_Y_INCREMENTS.THEME_VENUE_TIME *
		agendaSize.x;

	const themeAsText =
		'Theme: ' + meeting.theme;

	ctx.fillText(themeAsText, x, y);

}

function addTable() {

	setColumnX();
	addHeader();
	addPlan();
	addFooter();
}

function setColumnX() {

	let normalizedColumnPositions =
		[0.08, 0.08, 0.40, 0.40];

	tableMargin = 0.02 * agendaSize.x;

	for (let i = 0; i < 4; i++) {
		columnXSizes[i] = normalizedColumnPositions[i] * agendaSize.x;
	}

	x = tableMargin;

	for (let i = 0; i < 4; i++) {

		columnXPositions[i] = x;
		x += columnXSizes[i];
	}
}

function addHeader() {

	y +=
		NORMALIZED_Y_INCREMENTS.THEME_VENUE_TIME_TO_TABLE_HEADER *
		agendaSize.x;

	ctx.fillStyle = '#004165';
	ctx.font = '' + (NORMALIZED_FONT_SIZES.TABLE_HEADER * agendaSize.x) + 'px serif';
	ctx.textAlign = 'center';

	const underlineOffset = {
		x: 0.002 * agendaSize.x,
		y: 0.010 * agendaSize.x
	};

	const underlineYSize =
		0.002 * agendaSize.x;

	const columnNames = ['Time', 'Minutes', 'Roleplayer', 'Activity']

	// 4 columns

	for (let i = 0; i < 4; i++) {

		// column header text

		ctx.fillText(
			columnNames[i],
			columnXPositions[i] +  columnXSizes[i] / 2,
			y
		);

		// column header underline

		ctx.fillRect(
			columnXPositions[i] + underlineOffset.x,
			y + underlineOffset.y,
			columnXSizes[i] - 2 * underlineOffset.x,
			underlineYSize
		);
	}

}

function addPlan() {

	y +=
		NORMALIZED_Y_INCREMENTS.TABLE_HEADER_TO_PLAN_ITEMS *
		agendaSize.x;

	ctx.fillStyle = '#000000';
	ctx.font = '' + (NORMALIZED_FONT_SIZES.PLAN_ITEMS * agendaSize.x) + 'px serif';
	ctx.textAlign = 'center';

	const underlineOffset = {
		x: 0.008 * agendaSize.x,
		y: 0.010 * agendaSize.x
	};

	const underlineYSize =
		0.0002 * agendaSize.x;

	const REMAINING_TIME = -1;

	let planStart = {
		minutes:
			timeStringDifferenceInMinutes(meeting.startTime, meeting.joinByTime),
		roleplayer:
			'All roleplayers',
		description:
			'Preparation',
	};

	let planEnd = {
		minutes:
			REMAINING_TIME,
		roleplayer:
			'',
		description:
			'Buffer Time',
	};

	let time = meeting.joinByTime;

	for (let item of [planStart,...plan,planEnd]) {

		let roleplayerName =
			getRoleplayerName(item.roleplayer);

		let roleplayerText =
			((roleplayerName !== null) && (roleplayerName.length !== 0))
				? item.roleplayer + ' : ' + roleplayerName
				: item.roleplayer;

		if (item.minutes == REMAINING_TIME) {
			item.minutes =
				timeStringDifferenceInMinutes(meeting.stopTime, time);
		}

		let textRow = [
			time,
			item.minutes,
			roleplayerText,
			item.description
		];

		// 4 columns

		for (let i = 0; i < 4; i++) {

			ctx.fillText(
				textRow[i],
				columnXPositions[i] +  columnXSizes[i] / 2,
				y
			);

			ctx.fillRect(
				columnXPositions[i] + underlineOffset.x,
				y + underlineOffset.y,
				columnXSizes[i] - 2 * underlineOffset.x,
				underlineYSize
			);
		}

		time = addMinutesToTimeString(item.minutes, time);

		y +=
			NORMALIZED_Y_INCREMENTS.PLAN_ITEMS *
			agendaSize.x;
	}
}

function addFooter() {

	x = 0.50 * agendaSize.x;

	y +=
		NORMALIZED_Y_INCREMENTS.PLAN_ITEMS_TO_TABLE_FOOTER *
		agendaSize.x;

	ctx.fillStyle = '#000000';
	ctx.textAlign = 'center';

	const clubMission = [
		'We provide a supportive and positive learning experience',
		'in which members are empowered to develop communication and leadership skills,',
		'resulting in greater self-confidence and personal growth.'
	];

	ctx.font = 'bold ' + (NORMALIZED_FONT_SIZES.TABLE_FOOTER * agendaSize.x) + 'px serif';

	ctx.fillText('Club Mission', x, y);

	ctx.font = '' + (NORMALIZED_FONT_SIZES.TABLE_FOOTER * agendaSize.x) + 'px serif';

	let yIncrement =
		0.030 * agendaSize.x;


	for (line of clubMission) {

		y +=
			NORMALIZED_Y_INCREMENTS.TABLE_FOOTER *
			agendaSize.x;

		ctx.fillText(line, x, y);
	}

}
