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
		roleplayer: '',
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
		roleplayer: '',
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

let pickedItemNumber;

// view

const planTable =
	document.querySelector('#plan .tab_main table');

const planFooter =
	document.querySelector('#plan .tab_footer');

// when no item picked, pickedItemNumber: NONE

const NONE = -1;

// model to view

planToTable();
clearPicked();

function planToTable() {

	planTable.innerHTML = plan
		.reduce((html, item, index) => (html +
			emptySlotRow(index) +
			itemHeaderRow(index) +
			itemMinutesToRow(item.minutes, index) +
			itemRoleplayerToRow(item.roleplayer, index) +
			itemDescriptionRow(item.description, index)
		), '') +
		emptySlotRow(plan.size);
}

// add, drop, cancel pick buttons

function emptySlotRow(index) {

	return (
		'<tr>' +
			'<td>' +
				'<button class="add_buttons" onclick="add(' + index + ')"> add </button>' +
				'<button class="drop_buttons" onclick="drop(' + index + ')"> drop </button>' +
			'</td>' +
		'</tr>'
	);
}

// remove, pick buttons

function itemHeaderRow(index) {

	return (
		'<tr>' +
			'<td> [ ' + (index + 1) + ' ] ' +
				'<button class="remove_buttons" onclick="remove(' + index + ')"> remove </button>' +
				'<button class="pick_buttons" onclick="setPicked(' + index + ')"> pick </button>' +
			'</td>' +
		'</tr>'
	);
}

function itemMinutesToRow(minutes, index) {

	return ('<tr> <td> <input class="plan_item_minutes" onchange="rowToItemMinutes(' + index + ')" value="' + minutes + '" type="number"/> </td> </tr>');
}

function itemRoleplayerToRow(roleplayer, index) {

	return ('<tr> <td> <input class="plan_item_roleplayer" onchange="rowToItemRoleplayer(' + index + ')" value="' + roleplayer + '"/> </td> </tr>');
}

function itemDescriptionRow(description, index) {

	return ('<tr> <td> <input class="plan_item_description" onchange="rowToItemDescription(' + index + ')" value="' + description + '"/> </td> </tr>');
}

// view to model

function rowToItemMinutes(index) {
	plan[index].minutes =
		document.querySelectorAll('.plan_item_minutes')[index].value;
}

function rowToItemRoleplayer(index) {
	plan[index].roleplayer =
		document.querySelectorAll('.plan_item_roleplayer')[index].value;
}

function rowToItemDescription(index) {
	plan[index].description =
		document.querySelectorAll('.plan_item_description')[index].value;
}

function add(n) {

	const itemsBeforeItemToAdd =
		((n !== 0) ? plan.slice(0, n) : []);

	const itemsAfterItemToAdd =
		((n !== plan.size) ? plan.slice(n) : []);

	plan =
		[
			...itemsBeforeItemToAdd,
			{
				minutes:
					DEFAULTS.PLAN_ITEM_MINUTES,
				roleplayer:
					DEFAULTS.PLAN_ITEM_ROLEPLAYER,
				description:
					DEFAULTS.PLAN_ITEM_DESCRIPTION
			},
			...itemsAfterItemToAdd
		];

	planToTable();

	hideButtons(['drop_buttons', 'cancel_pick_buttons']);
}

function remove(n) {

	const itemsBeforeItemToRemove =
		((n !== 0) ? plan.slice(0, n) : []);

	const itemsAfterItemToRemove =
		((n !== plan.size - 1) ? plan.slice(n + 1) : []);

	plan =
		[...itemsBeforeItemToRemove, ...itemsAfterItemToRemove];

	planToTable();

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

	planToTable();

	clearPicked()
}

function movePickedItemDown(pickIndex, dropIndex) {

	const part1 =
		((pickIndex !== 0) ? plan.slice(0, pickIndex) : []);

	const part2 =
		((pickIndex !== dropIndex - 1) ? plan.slice(pickIndex + 1, dropIndex) : []);

	const part3 =
		((dropIndex !== plan.size) ? plan.slice(dropIndex + 1) : []);

	plan = [...part1, ...part2, plan[pickIndex], plan[dropIndex], ...part3];
}

// movePickedItemDown(2, 5);
//
// [i0, i1, i2, i3, i4, i5, i6, i7] ===> [i0, i1, i3, i4, i2, i5, i6, i7]

function movePickedItemUp(pickIndex, dropIndex) {

	const part1 =
		((dropIndex !== 0) ? plan.slice(0, dropIndex) : []);

	const part2 =
		((dropIndex !== pickIndex - 1) ? plan.slice(dropIndex + 1, pickIndex) : []);

	const part3 =
		((pickIndex !== plan.size) ? plan.slice(pickIndex + 1) : []);

	plan = [...part1, plan[pickIndex], plan[dropIndex], ...part2, ...part3];
}

// movePickedItemUp(5, 2);
//
// [i0, i1, i2, i3, i4, i5, i6, i7] ===>  [i0, i1, i5, i2, i3, i4, i6, i7]

// changes to view and model

function clearPicked() {

	planFooter.innerHTML =
		'[ nothing picked ]';

	pickedItemNumber = NONE;

	// no drop, cancel pick when no item is picked
	hideButtons(['drop_buttons', 'cancel_pick_buttons']);
	showButtons(['pick_buttons', 'add_buttons', 'remove_buttons']);
}

function setPicked(index) {

	planFooter.innerHTML =
		'[ ' + (index + 1) + ' ] <button class="cancel_pick_buttons" onclick="clearPicked()"> cancel pick </button>';

	pickedItemNumber = index;

	// no add, remove, pick when an item is picked
	hideButtons(['pick_buttons', 'add_buttons', 'remove_buttons']);
	showButtons(['drop_buttons', 'cancel_pick_buttons']);

	// no drop just before or just after picked item
	document.querySelectorAll('.drop_buttons')[index].style.display = 'none';
	document.querySelectorAll('.drop_buttons')[index + 1].style.display = 'none';
}

// hide buttons by class

function hideButtons(buttonClasses) {

	for (buttonClass of buttonClasses) {

		const buttonElements =
			document.querySelectorAll('.' + buttonClass);

		for (buttonElement of buttonElements)
			buttonElement.style.display = 'none';
	}
}

// show buttons by class

function showButtons(buttonClasses) {

	for (buttonClass of buttonClasses) {

		const buttonElements =
			document.querySelectorAll('.' + buttonClass);

		for (buttonElement of buttonElements)
			buttonElement.style.display = 'inline';
	}
}
