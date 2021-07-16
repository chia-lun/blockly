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

	var code = 'var iterations = ' + value_number_iterations + '\n;' +'for(var i = 0; i < iterations; i++){' + statements_inside_code + '\n}';

	return code
};

Blockly.JavaScript['new_set_variable_test_1'] = function(block) {
	Blockly.JavaScript.init(workspace);
	var variable_number_of_verses = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('number_of_verses'), Blockly.Variables.NAME_TYPE);
	var value_number = Blockly.JavaScript.valueToCode(block, 'number', Blockly.JavaScript.ORDER_ATOMIC);
	// TODO: Assemble JavaScript into code variable.
	var code = 'var ' + variable_number_of_verses + ' = ' + value_number +';\n';
	return code;
};

Blockly.JavaScript['verse_count'] = function(block) {
	Blockly.JavaScript.init(workspace);
	var variable_number_of_verses = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('number_of_verses'), Blockly.Variables.NAME_TYPE);
	return [variable_number_of_verses, Blockly.JavaScript.ORDER_ATOMIC];
}

//text blocks of Humpty Dumpty
Blockly.JavaScript['rhyme_humpty_dumpty_sat_on_a_wall'] = function(block) {
	return ['\'' + block.getFieldValue('TEXT') + '\'', Blockly.JavaScript.ORDER_ATOMIC];
}

Blockly.JavaScript['rhyme_humpty_dumpty_great_fall'] = function(block) {
	return ['\'' + block.getFieldValue('TEXT') + '\'', Blockly.JavaScript.ORDER_ATOMIC];
}

Blockly.JavaScript['rhyme_king_hourse_man'] = function(block) {
	return ["\"" + block.getFieldValue('TEXT') + "\"", Blockly.JavaScript.ORDER_ATOMIC];
}

Blockly.JavaScript['rhyme_could_not_put_together'] = function(block) {
	return ["\"" + block.getFieldValue('TEXT') + "\"", Blockly.JavaScript.ORDER_ADDITION];
}

//text blocks of Five Little Ducks
Blockly.JavaScript['rhyme_little_ducks'] = function(block) {
	Blockly.JavaScript.init(workspace);
	var value_count = Blockly.JavaScript.valueToCode(block, 'count', Blockly.JavaScript.ORDER_ATOMIC);
	var text = block.getFieldValue('TEXT');
	return [value_count + ' + \'' + text + '\'', Blockly.JavaScript.ORDER_ADDITION];
}

Blockly.JavaScript['rhyme_over_the_hills'] = function(block) {
	return ['\'' + block.getFieldValue('TEXT') + '\'', Blockly.JavaScript.ORDER_ATOMIC];
}

Blockly.JavaScript['rhyme_mother_duck'] = function(block) {
	return ['\'' + block.getFieldValue('TEXT') + '\'', Blockly.JavaScript.ORDER_ATOMIC];
}

Blockly.JavaScript['rhyme_little_duck_back'] = function(block) {
	var value_count = Blockly.JavaScript.valueToCode(block, 'count', Blockly.JavaScript.ORDER_ATOMIC);
	var text1 = block.getFieldValue('TEXT1')
	var text2 = block.getFieldValue('TEXT2')
	return ['\'' + text1 + ' \' + ' + value_count + ' + \' ' + text2 + ' \'', Blockly.JavaScript.ORDER_ATOMIC];
}

Blockly.JavaScript['duck_count'] = function(block) {
	Blockly.JavaScript.init(workspace);
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
	var code = variable_number_of_ducks + ' = ' + variable_number_of_ducks + ' - ' + value_decrease_value + ';\n';
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

Blockly.JavaScript['for_loop_increment_with_i'] = function(block) {
	Blockly.JavaScript.init(workspace);
	var variable_iterated_variable = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('iterated_variable'), Blockly.Variables.NAME_TYPE);
	var value_lower_bound = Blockly.JavaScript.valueToCode(block, 'lower_bound', Blockly.JavaScript.ORDER_ATOMIC);
	var value_upper_bound = Blockly.JavaScript.valueToCode(block, 'upper_bound', Blockly.JavaScript.ORDER_ATOMIC);
	var value_increment_by = Blockly.JavaScript.valueToCode(block, 'increment_by', Blockly.JavaScript.ORDER_ATOMIC);
	var statements_inside_statement = Blockly.JavaScript.statementToCode(block, 'inside_statement');
	
	var code = 'for(var i =' + value_lower_bound + ';i <' + value_upper_bound + '; i +=' + value_increment_by + '){'
		+variable_iterated_variable+ '= i;'
		+statements_inside_statement+ ';}\n';

	return code;
};

Blockly.JavaScript['for_loop_increment_with_j'] = function(block) {
	Blockly.JavaScript.init(workspace);
	var variable_iterated_variable = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('iterated_variable'), Blockly.Variables.NAME_TYPE);
	var value_lower_bound = Blockly.JavaScript.valueToCode(block, 'lower_bound', Blockly.JavaScript.ORDER_ATOMIC);
	var value_upper_bound = Blockly.JavaScript.valueToCode(block, 'upper_bound', Blockly.JavaScript.ORDER_ATOMIC);
	var value_increment_by = Blockly.JavaScript.valueToCode(block, 'increment_by', Blockly.JavaScript.ORDER_ATOMIC);
	var statements_inside_statement = Blockly.JavaScript.statementToCode(block, 'inside_statement');
	
	var code = 'for(var j =' + value_lower_bound + ';j <' + value_upper_bound + '; j +=' + value_increment_by + '){'
		+variable_iterated_variable+ '= j;'
		+statements_inside_statement+ ';}\n';

	return code;
};

Blockly.JavaScript['variable_i'] = function(block) {
	var variable_iterated_variable = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('iterated_variable'), Blockly.Variables.NAME_TYPE);
	return [variable_iterated_variable, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['variable_j'] = function(block) {
	var variable_iterated_variable = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('iterated_variable'), Blockly.Variables.NAME_TYPE);
	return [variable_iterated_variable, Blockly.JavaScript.ORDER_ATOMIC];
};

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

Blockly.JavaScript['rhyme_hey'] = function(block) {
	return ['\'' + block.getFieldValue('TEXT') + '\'', Blockly.JavaScript.ORDER_ATOMIC];
  };
   
Blockly.JavaScript['jingle'] = function(block) {
	Blockly.JavaScript.init(workspace);
	var variable_variable_jingle = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('variable_jingle'), Blockly.Variables.NAME_TYPE);
	var value_rhyme_1 = Blockly.JavaScript.valueToCode(block, 'rhyme_1', Blockly.JavaScript.ORDER_ATOMIC);
	var value_rhyme_2 = Blockly.JavaScript.valueToCode(block, 'rhyme_2', Blockly.JavaScript.ORDER_ATOMIC);
	var value_rhyme_3 = Blockly.JavaScript.valueToCode(block, 'rhyme_3', Blockly.JavaScript.ORDER_ATOMIC);
	var value_rhyme_4 = Blockly.JavaScript.valueToCode(block, 'rhyme_4', Blockly.JavaScript.ORDER_ATOMIC);

	var code = 'var ' + variable_variable_jingle + '=' + value_rhyme_1 + '+' + value_rhyme_2 + '+' + value_rhyme_3 + '+' + value_rhyme_4 + ';\n';
	return code;
};
   
Blockly.JavaScript['jingle_variable'] = function(block) {
	var variable_variable_jingle = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('variable_jingle'), Blockly.Variables.NAME_TYPE);
	return [variable_variable_jingle, Blockly.JavaScript.ORDER_NONE];
};

//text blocks for you know you are happy
Blockly.JavaScript['rhyme_if_you_are_happy'] = function(block) {
	return ['\'' + block.getFieldValue('TEXT') + '\'', Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['rhyme_face_show_it'] = function(block) {
	return ['\'' + block.getFieldValue('TEXT') + '\'', Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['rhyme_clap'] = function(block) {
	return ['\'' + block.getFieldValue('TEXT') + '\'', Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['rhyme_stomp'] = function(block) {
	return ['\'' + block.getFieldValue('TEXT') + '\'', Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['rhyme_shout'] = function(block) {
	return ['\'' + block.getFieldValue('TEXT') + '\'', Blockly.JavaScript.ORDER_ATOMIC];
};
  
//nursery rhyme block
Blockly.JavaScript['nursery_rhyme'] = function(block) {
	return(Blockly.JavaScript.statementToCode(block, 'nursery_rhyme'));
}

Blockly.JavaScript['this_is_correct'] = function(block) {
	return ['\'' + block.getFieldValue('TEXT') + '\'', Blockly.JavaScript.ORDER_ATOMIC];
  };

  Blockly.JavaScript['math_is_hard'] = function(block) {
	return ['\'' + block.getFieldValue('TEXT') + '\'', Blockly.JavaScript.ORDER_ATOMIC];
  };


