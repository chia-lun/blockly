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


Blockly.defineBlocksWithJsonArray([
	{
	  "type": "speak",
	  "message0": "Speak %1 %2",
	  "args0": [
	    {
	      "type": "input_dummy"
	    },
	    {
	      "type": "input_statement",
	      "name": "NAME"
	    }
	  ],
	  "colour": 230,
	  "tooltip": "",
	  "helpUrl": ""
	}


	])