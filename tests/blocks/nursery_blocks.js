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
        .appendField("count little ducks went out one day",'TEXT');
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
    this.appendDummyInput('TEXT')
        .appendField("But only",'TEXT');
    this.appendValueInput("Count")
        .setCheck("Number");
    this.appendDummyInput('TEXT')
        .appendField("little ducks come back",'TEXT');
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(65);
this.setTooltip("");
this.setHelpUrl("");
  }
}

Blockly.Blocks['repeat'] = {
    init: function() {
        this.appendValueInput("number_iterations")
            .setCheck("Number")
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
