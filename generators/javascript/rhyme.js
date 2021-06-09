'use strict';

goog.provide('Blockly.JavaScript.rhyme');

goog.require('Blockly.JavaScript');

Blockly.JavaScript['rhyme_little_lamb'] = function(block) {
	return ['\'' + block.getFieldValue('TEXT') + '\'', Blockly.JavaScript.ORDER_ATOMIC];
}

Blockly.JavaScript['rhyme_mary_had_a'] = function(block) {
	return ['\'' + block.getFieldValue('TEXT') + '\'', Blockly.JavaScript.ORDER_ATOMIC];
}

Blockly.JavaScript['rhyme_whose_fleece'] = function(block) {
	return ['\'' + block.getFieldValue('TEXT') + '\'', Blockly.JavaScript.ORDER_ATOMIC];
}

Blockly.JavaScript['rhyme_say'] = function(block) {
	var argument0 = Blockly.JavaScript.valueToCode(block, 'TEXT', Blockly.JavaScript.ORDER_ATOMIC) || '\'NOTHING\'';
	return 'window.speechSynthesis.speak(new SpeechSynthesisUtterance(' + argument0 + '));';
}

Blockly.JavaScript['repeat'] = function(block) {
	var value_number_iterations = Blockly.JavaScript.valueToCode(block, 'number_iterations', Blockly.JavaScript.ORDER_ATOMIC);
	var statements_inside_code = Blockly.JavaScript.statementToCode(block, 'inside_code');

	var code = 'for(var i = 0; i < ' + value_number_iterations + '; i++){' + statements_inside_code + '\n}';

	return code
};

//text blocks of Humpty Dumpty
Blockly.JavaScript['rhyme_humpty_dumpty_sat_on_a_wall'] = function(block) {
	return ['\'' + block.getFieldValue('TEXT') + '\'', Blockly.JavaScript.ORDER_ATOMIC];
}

Blockly.JavaScript['rhyme_humpty_dumpty_great_fall'] = function(block) {
	return ['\'' + block.getFieldValue('TEXT') + '\'', Blockly.JavaScript.ORDER_ATOMIC];
}

Blockly.JavaScript['rhyme_king_hourse_man'] = function(block) {
	return ['\'' + block.getFieldValue('TEXT') + '\'', Blockly.JavaScript.ORDER_ATOMIC];
}

Blockly.JavaScript['rhyme_could_not_put_together'] = function(block) {
	return ['\'' + block.getFieldValue('TEXT') + '\'', Blockly.JavaScript.ORDER_ATOMIC];
}

//text blocks of Five Little Ducks
Blockly.JavaScript['rhyme_little_ducks'] = function(block) {
	return ['\'' + block.getFieldValue('TEXT') + '\'', Blockly.JavaScript.ORDER_ATOMIC];
}

Blockly.JavaScript['rhyme_over_the_hills'] = function(block) {
	var value_count = Blockly.JavaScript.valueToCode(block, 'count', Blockly.JavaScript.ORDER_ATOMIC);
	var code = '\'' + value_count + " " + block.getFieldValue('TEXT') + '\''
	console.log(code)
	return [code, Blockly.JavaScript.ORDER_ATOMIC];
}

Blockly.JavaScript['rhyme_mother_duck'] = function(block) {
	return ['\'' + block.getFieldValue('TEXT') + '\'', Blockly.JavaScript.ORDER_ATOMIC];
}

Blockly.JavaScript['rhyme_little_duck_back'] = function(block) {
	var value_count = Blockly.JavaScript.valueToCode(block, 'count', Blockly.JavaScript.ORDER_ATOMIC);
	return ['\'' + block.getFieldValue('TEXT1') + " " + value_count + " " + block.getFieldValue('TEXT2')+ '\'', Blockly.JavaScript.ORDER_ATOMIC];
}

Blockly.JavaScript['duck_count'] = function(block) {
	var variable_number_of_ducks = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('number_of_ducks'), Blockly.Variables.NAME_TYPE);
	return [variable_number_of_ducks, Blockly.JavaScript.ORDER_ATOMIC];
};


Blockly.JavaScript['set_variable'] = function(block) {
	Blockly.JavaScript.init(workspace);
	var variable_number_of_ducks = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('number_of_ducks'), Blockly.Variables.NAME_TYPE);
	var value_variable_value = Blockly.JavaScript.valueToCode(block, 'variable_value', Blockly.JavaScript.ORDER_ATOMIC);
	var code = 'var ' + variable_number_of_ducks + ' = ' + value_variable_value +';\n';
	return code;
};

Blockly.JavaScript['decrement_variable'] = function(block) {
	Blockly.JavaScript.init(workspace);
	var variable_number_of_ducks = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('number_of_ducks'), Blockly.Variables.NAME_TYPE);
	var value_decrease_value = Blockly.JavaScript.valueToCode(block, 'decrease_value', Blockly.JavaScript.ORDER_ATOMIC);
	var code = 'var ' + variable_number_of_ducks + ' = ' + variable_number_of_ducks + ' - ' + value_decrease_value + ';\n';
	return code;
};

//text blocks for London Bridge
Blockly.JavaScript['rhyme_london_bridge'] = function(block) {
	return ['\'' + block.getFieldValue('TEXT') + '\'', Blockly.JavaScript.ORDER_ATOMIC];
}

Blockly.JavaScript['rhyme_falling_down'] = function(block) {
	return ['\'' + block.getFieldValue('TEXT') + '\'', Blockly.JavaScript.ORDER_ATOMIC];
}

Blockly.JavaScript['rhyme_my_fair_lady'] = function(block) {
	return ['\'' + block.getFieldValue('TEXT') + '\'', Blockly.JavaScript.ORDER_ATOMIC];
}

//text blocks for Jingle Bells
Blockly.JavaScript['rhyme_jingle_bells'] = function(block) {
	return ['\'' + block.getFieldValue('TEXT') + '\'', Blockly.JavaScript.ORDER_ATOMIC];
}

Blockly.JavaScript['rhyme_all_the_way'] = function(block) {
	return ['\'' + block.getFieldValue('TEXT') + '\'', Blockly.JavaScript.ORDER_ATOMIC];
}

Blockly.JavaScript['rhyme_fun_to_ride'] = function(block) {
	return ['\'' + block.getFieldValue('TEXT') + '\'', Blockly.JavaScript.ORDER_ATOMIC];
}

Blockly.JavaScript['rhyme_open_sleigh'] = function(block) {
	return ['\'' + block.getFieldValue('TEXT') + '\'', Blockly.JavaScript.ORDER_ATOMIC];
}

//nursery rhyme block
Blockly.JavaScript['nursery_rhyme'] = function(block) {
	return(Blockly.JavaScript.statementToCode(block, 'nursery_rhyme'));
}


