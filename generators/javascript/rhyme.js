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

	for(var i = 0; i < value_number_iterations; i++){
		eval(statements_inside_code)
	}
};

Blockly.JavaScript['speak'] = function(block) {
	return(Blockly.JavaScript.statementToCode(block, 'NAME'));
}

