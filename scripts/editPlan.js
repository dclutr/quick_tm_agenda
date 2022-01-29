// model

let plan = [
	{
		roleplayer: 'Sergeant-at-Arms',
		minutes: 4,
		description: 'Meeting rules'
	},
	{
		roleplayer: 'Presiding officer',
		minutes: 4,
		description: "Welcome address"
	},
	{
		roleplayer: 'Toastmaster of the Day',
		minutes: 4,
		description: 'Theme introduction'
	},
	{
		roleplayer: 'Timer',
		minutes: 2,
		description: 'Roles and responsibilities'
	},
	{
		roleplayer: 'Ah counter',
		minutes: 2,
		description: 'Roles and responsibilities'
	},
	{
		roleplayer: 'Grammarian',
		minutes: 2,
		description: 'Roles and responsibilities'
	},
	{
		roleplayer: 'General Evaluator',
		minutes: 2,
		description: 'Roles and responsibilities'
	},
	{
		roleplayer: 'Toastmaster of the Day',
		minutes: 4,
		description: 'Theme elaboration'
	},
	{
		roleplayer: 'Evaluator 1',
		minutes: 1,
		description: 'Objectives of Speaker 1'
	},
	{
		roleplayer: 'Speaker 1',
		minutes: 7,
		description: 'Speech'
	},
	{
		minutes: 1,
		description: 'Feedback to Speaker 1'
	},
	{
		roleplayer: 'Evaluator 2',
		minutes: 1,
		description: 'Objectives of Speaker 2'
	},
	{
		roleplayer: 'Speaker 2',
		minutes: 7,
		description: 'Speech'
	},
	{
		minutes: 1,
		description: 'Feedback to Speaker 2'
	},
	{
		roleplayer: 'Toastmaster of the Day',
		minutes: 2,
		description: 'Timing details and Voting'
	},
	{
		roleplayer: 'Toastmaster of the Day',
		minutes: 3,
		description: 'Theme elaboration'
	},
	{
		roleplayer: 'Table Topics Master',
		minutes: 2,
		description: 'Explanation of Table Topics'
	},
	{
		roleplayer: 'Table Topics Master',
		minutes: 15,
		description: 'Table Topics Session'
	},
	{
		roleplayer: 'Table Topics Master',
		minutes: 2,
		description: 'Timing details and Voting'
	},
	{
		roleplayer: 'Toastmaster of the Day',
		minutes: 2,
		description: 'Theme elaboration'
	},
	{
		roleplayer: 'General Evaluator',
		minutes: 1,
		description: 'Evaluation session'
	},
	{
		roleplayer: 'Evaluator 1',
		minutes: 3,
		description: 'Evaluation for Speaker 1'
	},
	{
		roleplayer: 'Evaluator 2',
		minutes: 3,
		description: 'Evaluation for Speaker 2'
	},
	{
		roleplayer: 'General Evaluator',
		minutes: 2,
		description: 'Timing details and Voting'
	},
	{
		roleplayer: 'Ah counter',
		minutes: 3,
		description: "Ah counter's report"
	},
	{
		roleplayer: 'Grammarian',
		minutes: 3,
		description: "Grammarian's report"
	},
	{
		roleplayer: 'General Evaluator',
		minutes: 8,
		description: "General Evaluator's report"
	},
	{
		roleplayer: 'General Evaluator',
		minutes: 2,
		description: 'Timing details and Voting'
	},
	{
		roleplayer: 'Toastmaster of the Day',
		minutes: 2,
		description: 'Conclusion'
	},
	{
		roleplayer: 'Presiding officer',
		minutes: 5,
		description: 'Awards & Concluding Remarks'
	},
];

// view

const planTable =
	document.querySelector('#plan .tab_main table');

const planFooter =
	document.querySelector('#plan .tab_footer');

// null when no item picked

let pickedItemNumber = null;

// model to view

drawPlan();

hideButtons(['drop_buttons', 'cancel_pick_buttons']);

planFooter.innerHTML = '[ nothing picked ]';

function drawPlan() {

	planTable.innerHTML = plan
		.reduce((html, item, index) => (html +
			getSlotHtml(index) +
			getItemHtml(index) +
			getMinutesHtml(item, index) +
			getRoleplayerHtml(item, index) +
			getDescriptionHtml(item, index)
		), '') +
		getSlotHtml(plan.size);
}

// add, drop, cancel pick buttons

function getSlotHtml(index) {

	return (
		'<tr>' +
			'<td style="background-color: #CCC;"> </td>' +
			'<td style="background-color: #CCC;">' +
				'<button ' +
					'class="add_buttons" ' +
					'onclick="add(' + index + ')">' +
						'add' +
				'</button>' +
				'<button ' +
					'class="drop_buttons" ' +
					'onclick="drop(' + index + ')">' +
						'drop' +
				'</button>' +
			'</td>' +
		'</tr>'
	);
}

// remove, pick buttons

function getItemHtml(index) {

	return (
		'<tr>' +
			'<td>' + (index + 1) + '</td>' +
			'<td>' +
				'<button ' +
					'class="remove_buttons" ' +
					'onclick="remove(' + index + ')">' +
					'remove' +
				'</button>' +
				'<button ' +
					'class="pick_buttons" ' +
					'onclick="setPicked(' + index + ')">' +
						'pick' +
				'</button>' +
			'</td>' +
		'</tr>'
	);
}

function getMinutesHtml(item, index) {

	if (item.minutes === undefined) {
		item.minutes = 0;
	}

	return (
		'<tr>' +
			'<td> Minutes </td>' +
			'<td>' +
				'<input ' +
					'id="plan_minutes_' + index + '" ' +
					'onchange=changePlanMinutes(' + index + ') ' +
					'value="' + item.minutes + '" ' +
					'type="number"/>' +
			'</td>' +
		'</tr>'
	);
}

function getRoleplayerHtml(item, index) {

	if (item.roleplayer === undefined) {
		item.roleplayer = '';
	}

	return (
		'<tr>' +
			'<td> Roleplayer </td>' +
			'<td>' +
				'<input ' +
					'id="plan_roleplayer_' + index + '" ' +
					'onchange=changePlanRoleplayer(' + index + ') ' +
					'value="' + item.roleplayer + '"/>' +
			'</td>' +
		'</tr>'
	);
}

function getDescriptionHtml(item, index) {

	if (item.description === undefined) {
		item.description = '';
	}

	return (
		'<tr>' +
			'<td> Description </td>' +
			'<td>' +
				'<input ' +
					'id="plan_description_' + index + '" ' +
					'onchange=changePlanDescription(' + index + ') ' +
					'value="' + item.description + '"/>' +
			'</td>' +
		'</tr>'
	);
}

// view to model

function add(n) {

	const itemsBeforeItemToAdd =
		((n !== 0) ? plan.slice(0, n) : []);

	const itemsAfterItemToAdd =
		((n !== plan.size) ? plan.slice(n) : []);

	plan =
		[...itemsBeforeItemToAdd, {}, ...itemsAfterItemToAdd];

	drawPlan();

	hideButtons(['drop_buttons', 'cancel_pick_buttons']);
}

function remove(n) {

	const itemsBeforeItemToRemove =
		((n !== 0) ? plan.slice(0, n) : []);

	const itemsAfterItemToRemove =
		((n !== plan.size - 1) ? plan.slice(n + 1) : []);

	plan =
		[...itemsBeforeItemToRemove, ...itemsAfterItemToRemove];

	drawPlan();

	hideButtons(['drop_buttons', 'cancel_pick_buttons']);
}

function drop(n) {

	const pickIndex = pickedItemNumber;
	const dropIndex = n;

	if (pickIndex < dropIndex) {
		movePickedItemDown(pickIndex, dropIndex);
	}
	else if (dropIndex < pickIndex) {
		movePickedItemUp(pickIndex, dropIndex);
	}

	drawPlan();

	clearPicked()
}

function clearPicked() {

	planFooter.innerHTML = '[ nothing picked ]';
	pickedItemNumber = null;
	hideButtons(['drop_buttons', 'cancel_pick_buttons']);
	showButtons(['pick_buttons', 'add_buttons', 'remove_buttons']);
}

function setPicked(index) {

	planFooter.innerHTML =
		' [ ' +
		(index + 1) +
		' ] ' +
		'<button ' +
			'class="cancel_pick_buttons" ' +
			'onclick="clearPicked()">'+
				'cancel pick' +
		'</button>';

	pickedItemNumber = index;

	hideButtons(['pick_buttons', 'add_buttons', 'remove_buttons']);
	showButtons(['drop_buttons', 'cancel_pick_buttons']);
	document.querySelectorAll('.drop_buttons')[index].style.display = 'none';
	document.querySelectorAll('.drop_buttons')[index + 1].style.display = 'none';
}

// changing model

function movePickedItemDown(pickIndex, dropIndex) {

	const part1 =
		((pickIndex !== 0) ? plan.slice(0, pickIndex) : []);

	const part2 =
		((pickIndex !== dropIndex - 1) ? plan.slice(pickIndex + 1, dropIndex) : []);

	const part3 =
		((dropIndex !== plan.size) ? plan.slice(dropIndex + 1) : []);

	plan = [...part1, ...part2, plan[pickIndex], plan[dropIndex], ...part3];
}

// before
// plan === [i0, i1, i2, i3, i4, i5, i6, i7]
//
// movePickedItemDown(2, 5);
//
// after
// plan === [i0, i1, i3, i4, i2, i5, i6, i7]

function movePickedItemUp(pickIndex, dropIndex) {

	const part1 =
		((dropIndex !== 0) ? plan.slice(0, dropIndex) : []);

	const part2 =
		((dropIndex !== pickIndex - 1) ? plan.slice(dropIndex + 1, pickIndex) : []);

	const part3 =
		((pickIndex !== plan.size) ? plan.slice(pickIndex + 1) : []);

	plan = [...part1, plan[pickIndex], plan[dropIndex], ...part2, ...part3];
}

// before
// plan === [i0, i1, i2, i3, i4, i5, i6, i7]
//
// movePickedItemUp(5, 2);
//
// after
// plan === [i0, i1, i5, i2, i3, i4, i6, i7]

// changing view

function hideButtons(buttonClasses) {

	for (buttonClass of buttonClasses) {

		const buttonElements = document.querySelectorAll('.' + buttonClass);

		for (buttonElement of buttonElements)
			buttonElement.style.display = 'none';
	}
}

function showButtons(buttonClasses) {

	for (buttonClass of buttonClasses) {

		const buttonElements = document.querySelectorAll('.' + buttonClass);

		for (buttonElement of buttonElements)
			buttonElement.style.display = 'inline';
	}
}
