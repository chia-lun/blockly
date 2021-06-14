'use strict';

goog.provide('Blockly.NurseryBlocks');


Blockly.Blocks['speak'] = {
	/**
	 * Block to speak strings of text.
	 */
  init: function() {
    this.appendDummyInput()
        .appendField('Speak');
    this.appendStatementInput('INNER')
        .setCheck(null);
    this.setColour(230);
 	this.setTooltip("");
 	this.setHelpUrl("");
 	this.setDeletable(false);
  }
};

//text blocks of Humpty Dumpty
Blockly.Blocks['rhyme_mary_had_a'] = {
  init: function() {
    this.appendDummyInput('TEXT')
        .appendField("Mary had a", 'TEXT');
    this.setOutput(true, null);
    // this.setNextStatement(true, null);
    // this.setPreviousStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['rhyme_little_lamb'] = {
  init: function() {
    this.appendDummyInput('TEXT')
        .appendField("little lamb", 'TEXT');
    this.setOutput(true, null);
    // this.setNextStatement(true, null);
    // this.setPreviousStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['rhyme_whose_fleece'] = {
  init: function() {
    this.appendDummyInput('TEXT')
        .appendField("whose fleece was white as snow.", 'TEXT');
    this.setOutput(true, null);
    // this.setNextStatement(true, null);
    // this.setPreviousStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['rhyme_say'] = {
  init: function() {
    this.appendValueInput("TEXT")
        .setCheck(null)
        .appendField("Say");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['rhyme_humpty_dumpty_sat_on_a_wall'] = {
  init: function() {
    this.appendDummyInput("TEXT")
        .appendField("Humpty Dumpty sat on a wall",'TEXT');
    this.setOutput(true, null);
    this.setColour(20);
 this.setTooltip("");
 this.setHelpUrl("");
  }
}

 Blockly.Blocks['rhyme_humpty_dumpty_great_fall'] = {
  init: function() {
    this.appendDummyInput("TEXT")
        .appendField("Humpty Dumpty had a great fall",'TEXT');
    this.setOutput(true, null);
    this.setColour(20);
 this.setTooltip("");
 this.setHelpUrl("");
  }
 }

 Blockly.Blocks['rhyme_king_hourse_man'] = {
  init: function() {
    this.appendDummyInput("TEXT")
        .appendField("All the kings horses and all the kings men",'TEXT');
    this.setOutput(true, null);
    this.setColour(20);
 this.setTooltip("");
 this.setHelpUrl("");
  }
}

 Blockly.Blocks['rhyme_could_not_put_together'] = {
  init: function() {
    this.appendDummyInput("TEXT")
        .appendField("Couldnt put Humpty together again",'TEXT');
    this.setOutput(true, null);
    this.setColour(20);
 this.setTooltip("");
 this.setHelpUrl("");
  }
 }

//text blocks of Five Little Ducks

Blockly.Blocks['rhyme_little_ducks'] = {
    init: function() {
        this.appendValueInput("count")
        this.appendDummyInput("TEXT")
            .appendField("little ducks went out one day",'TEXT');
        this.setOutput(true, null);
        this.setColour(65);
        this.setTooltip("");
        this.setHelpUrl("");
    }
}

 Blockly.Blocks['rhyme_over_the_hills'] = {
  init: function() {
    this.appendDummyInput("TEXT")
        .appendField("Over the hills and far away",'TEXT');
    this.setOutput(true, null);
    this.setColour(65);
 this.setTooltip("");
 this.setHelpUrl("");
  }
}

Blockly.Blocks['rhyme_mother_duck'] = {
  init: function() {
    this.appendDummyInput("TEXT")
        .appendField("Mother duck said, quack, quack, quack, quack",'TEXT');
    this.setOutput(true, null);
    this.setColour(65);
 this.setTooltip("");
 this.setHelpUrl("");
  }
}

Blockly.Blocks['rhyme_little_duck_back'] = {
  init: function() {
    this.appendDummyInput('TEXT1')
        .appendField("But only",'TEXT1');
    this.appendValueInput("count")
        .setCheck("Number");
    this.appendDummyInput('TEXT2')
        .appendField("little ducks came back",'TEXT2');
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(65);
this.setTooltip("");
this.setHelpUrl("");
  }
}

//text blocks for London Bridge

Blockly.Blocks['rhyme_london_bridge'] = {
  init: function() {
    this.appendDummyInput("TEXT")
        .appendField("London Bridge is falling down",'TEXT');
    this.setOutput(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
}

Blockly.Blocks['rhyme_falling_down'] = {
  init: function() {
    this.appendDummyInput("TEXT")
        .appendField("Falling down",'TEXT');
    this.setOutput(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
}

Blockly.Blocks['rhyme_my_fair_lady'] = {
  init: function() {
    this.appendDummyInput("TEXT")
        .appendField("My fair lady",'TEXT');
    this.setOutput(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
}

//text blocks for Jingle Bells
Blockly.Blocks['rhyme_jingle_bells'] = {
  init: function() {
    this.appendDummyInput("TEXT")
        .appendField("Jingle bells, jingle bells",'TEXT');
    this.setOutput(true, null);
    this.setColour(120);
 this.setTooltip("");
 this.setHelpUrl("");
  }
}

Blockly.Blocks['rhyme_all_the_way'] = {
  init: function() {
    this.appendDummyInput("TEXT")
        .appendField("Jingle all the way",'TEXT');
    this.setOutput(true, null);
    this.setColour(120);
 this.setTooltip("");
 this.setHelpUrl("");
  }
}

Blockly.Blocks['rhyme_fun_to_ride'] = {
  init: function() {
    this.appendDummyInput("TEXT")
        .appendField("Oh, what fun it is to ride",'TEXT');
    this.setOutput(true, null);
    this.setColour(120);
 this.setTooltip("");
 this.setHelpUrl("");
  }
}

Blockly.Blocks['rhyme_open_sleigh'] = {
  init: function() {
    this.appendDummyInput("TEXT")
        .appendField("In a one horse open sleigh",'TEXT');
    this.setOutput(true, null);
    this.setColour(120);
 this.setTooltip("");
 this.setHelpUrl("");
  }
}

//text blocks for "If you're happy and you know it"
Blockly.Blocks['rhyme_if_you_are_happy'] = {
  init: function() {
    this.appendDummyInput("TEXT")
        .appendField("If you are happy and you know it",'TEXT');
    this.setOutput(true, null);
    this.setColour(260);
 this.setTooltip("");
 this.setHelpUrl("");
  }
}

Blockly.Blocks['rhyme_face_show_it'] = {
  init: function() {
    this.appendDummyInput("TEXT")
        .appendField("Then your face will surely show it",'TEXT');
    this.setOutput(true, null);
    this.setColour(260);
 this.setTooltip("");
 this.setHelpUrl("");
  }
}

Blockly.Blocks['rhyme_clap'] = {
  init: function() {
    this.appendDummyInput("TEXT")
        .appendField("clap your hands",'TEXT');
    this.setOutput(true, null);
    this.setColour(260);
 this.setTooltip("");
 this.setHelpUrl("");
  }
}

Blockly.Blocks['rhyme_stomp'] = {
  init: function() {
    this.appendDummyInput("TEXT")
        .appendField("stomp your feet",'TEXT');
    this.setOutput(true, null);
    this.setColour(260);
 this.setTooltip("");
 this.setHelpUrl("");
  }
}

Blockly.Blocks['rhyme_shout'] = {
  init: function() {
    this.appendDummyInput("TEXT")
        .appendField("shout hurry",'TEXT');
    this.setOutput(true, null);
    this.setColour(260);
 this.setTooltip("");
 this.setHelpUrl("");
  }
}

Blockly.Blocks['repeat'] = {
    init: function() {
        this.appendValueInput("number_iterations")
            .setAlign(Blockly.ALIGN_CENTRE)
            .appendField(new Blockly.FieldLabelSerializable("repeat"), "repetitions");
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_CENTRE)
            .appendField("times");
        this.appendStatementInput("inside_code")
            .setCheck(null)
            .appendField(new Blockly.FieldLabelSerializable("do"), "say");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null)
        this.setColour(120);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};


Blockly.Blocks['nursery_rhyme'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Nursery Rhyme");
        this.appendStatementInput("nursery_rhyme")
            .setCheck(null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
}


Blockly.Blocks['new_set_variable_test_1'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Set")
        .appendField(new Blockly.FieldVariable("number of verses"), "number_of_verses");
    this.appendValueInput("number")
        .setCheck("Number")
        .appendField("to");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(330);
 this.setTooltip("");
 this.setHelpUrl("");
  }
}

Blockly.Blocks['verse_count'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldVariable("number of verses"), "number_of_verses");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(330);
 this.setTooltip("");
 this.setHelpUrl("");
  }
}

Blockly.Blocks['duck_count'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldVariable("number of ducks"), "number_of_ducks");
        this.setInputsInline(true);
        this.setOutput(true, null);
        this.setColour(65);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['set_variable'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Set")
            .appendField(new Blockly.FieldVariable("number of ducks"), "number_of_ducks");
        this.appendDummyInput()
            .appendField("to");
        this.appendValueInput("variable_value")
            .setCheck("Number");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(330);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['decrement_variable'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Decrease")
            .appendField(new Blockly.FieldVariable("number of ducks"), "number_of_ducks");
        this.appendDummyInput()
            .appendField("by");
        this.appendValueInput("decrease_value")
            .setCheck("Number");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(330);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['for_loop_increment_with_i'] = {
  init: function() {
    this.appendDummyInput("iterated_variable")
        .appendField("count with ")
        .appendField(new Blockly.FieldVariable("i"), "iterated_variable");
    this.appendValueInput("lower_bound")
        .setCheck("Number")
        .appendField("from");
    this.appendValueInput("upper_bound")
        .setCheck("Number")
        .appendField("to");
    this.appendValueInput("increment_by")
        .setCheck("Number")
        .appendField("by");
    this.appendStatementInput("inside_statement")
        .setCheck(null);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(260);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['for_loop_increment_with_j'] = {
  init: function() {
    this.appendDummyInput("iterated_variable")
        .appendField("count with ")
        .appendField(new Blockly.FieldVariable("j"), "iterated_variable");
    this.appendValueInput("lower_bound")
        .setCheck("Number")
        .appendField("from");
    this.appendValueInput("upper_bound")
        .setCheck("Number")
        .appendField("to");
    this.appendValueInput("increment_by")
        .setCheck("Number")
        .appendField("by");
    this.appendStatementInput("inside_statement")
        .setCheck(null);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(260);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['variable_i'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldVariable("i"), "iterated_variable");
    this.setOutput(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['variable_j'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldVariable("j"), "iterated_variable");
    this.setOutput(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

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
