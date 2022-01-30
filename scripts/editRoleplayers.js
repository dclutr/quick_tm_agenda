// model

let roleplayers = [
	{
		role: 'Sergeant-at-arms',
		name: 'TM Frodo'
	},
	{
		role: 'Presiding Officer',
		name: 'TM Aragon'
	},
	{
		role: 'Toastmaster of the Day',
		name: 'TM Eowyn'
	},
	{
		role: 'Timer',
		name: 'TM Gandalf'
	},
	{
		role: 'Ah counter',
		name: 'TM Pippin'
	},
	{
		role: 'Grammarian',
		name: 'TM Boromir'
	},
	{
		role: 'General Evaluator',
		name: 'TM Galadriel'
	},
	{
		role: 'Table Topics Master',
		name: 'TM Merry'
	},,
	{
		role: 'Evaluator 1',
		name: 'TM Elrond'
	},
	{
		role: 'Speaker 1',
		name: 'TM Bilbo'
	},
	{
		role: 'Evaluator 2',
		name: 'TM Gollum'
	},
	{
		role: 'Speaker 2',
		name: 'TM Gollum'
	}

];

// get name for role

function getRoleplayerName(role) {

	const trimRole = r => r.replaceAll(' ','').replaceAll('-','').toLowerCase();

	const filteredRoleplayers =
		roleplayers.filter(
			roleplayer => (trimRole(roleplayer.role) === trimRole(role))
		);

	if (filteredRoleplayers.length > 0) {
		return filteredRoleplayers[0].name;
	}

	return null;
}

// view

const roleplayersTable =
	document.querySelector('#roleplayers .tab_main table');

const [increaseRoleplayersButton, decreaseRoleplayersButton] =
	document.querySelectorAll('#roleplayers .tab_footer button');

// change number of roleplayers in model and view

increaseRoleplayersButton.onclick = () => {
	roleplayers.push({});
	drawRoleplayersTable();
}

decreaseRoleplayersButton.onclick = () => {
	roleplayers.pop();
	drawRoleplayersTable();
}

// model to view

drawRoleplayersTable();

function drawRoleplayersTable() {

	roleplayersTable.innerHTML = roleplayers
		.reduce((html, roleplayer, index) => (
			html +
			getRoleplayerNameHtml(index) +
			getRoleplayerRoleHtml(index)
		), '');
}

function getRoleplayerNameHtml(i) {

	if (roleplayers[i].name === undefined) {
		roleplayers[i].name = '<roleplayer name>';
	}

	return (
		'<tr>' +
			'<td style="background-color: #CCC;"> </td>' +
			'<td style="background-color: #CCC;"> </td>' +
		'</tr>' +
		'<tr>' +
			'<td> Name ' + (i + 1) + '</td>' +
			'<td>' +
				'<input ' +
					'id="roleplayer_' + i + '_name" '+
					'onchange="changeRoleplayerName(' + i + ')" ' +
					'value="' + roleplayers[i].name + '"' +
				'/> '+
			'</td>' +
		'</tr>'
	);
}

function getRoleplayerRoleHtml(i) {

	if (roleplayers[i].role === undefined) {
		roleplayers[i].role = '<roleplayer role>';
	}

	return (
		'<tr>' +
			'<td> Role ' + (i + 1) + '</td>' +
			'<td>' +
				'<input ' +
					'id="roleplayer_' + i + '_role" ' +
					'onchange="changeRoleplayerRole(' + i + ')"' +
					'value="' + roleplayers[i].role + '"' +
				'/>'+
			'</td>' +
		'</tr>'
	);
}

// view to model

function changeRoleplayerName(i) {
	roleplayers[i].name = document.querySelector('#roleplayer_' + i + '_name').value;
}

function changeRoleplayerRole(i) {
	roleplayers[i].role = document.querySelector('#roleplayer_' + i + '_role').value;
}
