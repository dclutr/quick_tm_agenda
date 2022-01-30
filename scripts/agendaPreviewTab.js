// view

const agendaPreviewTab =
	document.querySelector('#agenda_preview');

const agendaPreviewCanvas =
	document.querySelector('#agenda_preview .tab_main canvas');

const agendaDownloadLink =
	document.querySelector('#agenda_preview .tab_footer a');

const agendaPreviewButton =
	document.querySelectorAll('#page_footer button')[1];


// canvas

const AGENDA_MARGIN = 16;

// agenda preview button

agendaPreviewButton.onclick = startAgendaPreview;

function startAgendaPreview() {

	// hide start preview button

	agendaPreviewButton.style.display = 'none';

	// load agenda preview

	switchToAgendaPreviewTab();
	drawAgendaPreviewCanvas();

	// load agenda download link
	agendaDownloadLink.href = agendaPreviewCanvas.toDataURL('image/jpeg', 1.0);;
}

// switch to agenda preview tab

function switchToAgendaPreviewTab() {

	// hide all tabs

	const tabs =
		document.querySelectorAll('.tab');

	for (tab of tabs) {
		tab.style.display = 'none';
	}

	// show agenda preview tab

	agendaPreviewTab.style.display = 'block';
}
