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

	var code = ""

	for(var i = 0; i < value_number_iterations; i++){
		code = code += statements_inside_code + '\n'
	}

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
	return ['\'' + block.getFieldValue('TEXT') + '\'', Blockly.JavaScript.ORDER_ATOMIC];
}

Blockly.JavaScript['rhyme_mother_duck'] = function(block) {
	return ['\'' + block.getFieldValue('TEXT') + '\'', Blockly.JavaScript.ORDER_ATOMIC];
}

Blockly.JavaScript['rhyme_little_duck_back'] = function(block) {
	return ['\'' + block.getFieldValue('TEXT') + '\'', Blockly.JavaScript.ORDER_ATOMIC];
}

Blockly.JavaScript['nursery_rhyme'] = function(block) {
	return(Blockly.JavaScript.statementToCode(block, 'nursery_rhyme'));
}

