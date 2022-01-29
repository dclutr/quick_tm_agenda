// dom elements

const tabs =
	document.querySelectorAll('.tab');

const tabSelector =
	document.querySelector('#page_footer select');

const editButton =
	document.querySelectorAll('#page_footer button')[0];

// switch to tab selected by default

switchToSelectedEditTab();

// switch to tab selected

editButton.onclick = switchToSelectedEditTab;
tabSelector.onchange = switchToSelectedEditTab;

// switching to the tab selected

function switchToSelectedEditTab() {

	// hide all tabs

	for (tab of tabs) {
		tab.style.display = 'none';
	}

	// change stop preview button to start preview button

	if (agendaPreviewButton.style.display !== 'inline') {
		agendaPreviewButton.style.display = 'inline';
	}

	// show selected tab

	const selectedTabName = tabSelector.value;

	const selectedTab =
		document.querySelector('#' + selectedTabName);

	selectedTab.style.display = 'block';
}
