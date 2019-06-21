/**
 * @fileoverview The class for generating accessible linearization
 * of a workspace, and a helper classes
 */

goog.provide('Blockly.Linearization');
goog.provide('Blockly.Linearization.BlockJoiner');

/**
 * Class for generating the linearization of a workspace, displayed in
 * parent nav and mainNavList.
 *
 * @constructor
 * @param {!Blockly.Workspace} workspace the main workspace to represent
 * @param {HTMLElement} parentNav the p element to display the parent
 * breadcrumbs within
 * @param {HTMLElement} mainNavList the p element to display the main
 * linearization of workspace within
 */
Blockly.Linearization = function(workspace, parentNav, mainNavList) {
  this.workspace = workspace;
  this.parentNav = parentNav;
  this.mainNavList = mainNavList;
  this.blockJoiner = new Blockly.Linearization.BlockJoiner();
  workspace.addChangeListener(this.generateList_.bind(this));
}

/**
 * Class to manage requests for blocks from connections, and vice-versa.
 * Allows for a single connection request and a single block request at a time.
 * @constructor
 */
Blockly.Linearization.BlockJoiner = function() {}

/**
 * Attempt to fill the request for this item. item must be Blockly.Block or
 * Blockly.Connection.
 * @param {Block.ASTNode} item
 * @return {boolean} true if successfully pushed, false if request fails
 */
Blockly.Linearization.BlockJoiner.prototype.push = function(item) {
  if (item.getLocation() instanceof Blockly.Block) {
    this.blockNode = item;
  } else if (item.getLocation() instanceof Blockly.Connection) {
    this.connectionNode = item;
  } else {
    return false;
  }

  this.service_();
  return true;
}

/**
 * Attempt to pair blockNode and connectionNode. If successful, join the
 * connections, and then clear them.
 * @private
 */
Blockly.Linearization.BlockJoiner.prototype.service_ = function() {
  if (!(this.blockNode && this.connectionNode)) {
    return;
  }

  var insertPointNode = this.connectionNode;
  var advance, back;
  // define advance and back by the direction the connection node requests
  switch (insertPointNode.getType()) {
    case Blockly.ASTNode.types.NEXT:
    case Blockly.ASTNode.types.INPUT:
      advance = n => n.next();
      back = n => n.prev();
      break;
    case Blockly.ASTNode.types.PREVIOUS:
      advance = n => n.prev();
      back = n => n.next();
      break;
    default:
      console.log({warn:'fell through', insertPointNode});
      return;
  }

  // Get the previous connection, disallow fields
  var previous = advance(insertPointNode);
  if (previous && previous.getType() === Blockly.ASTNode.types.FIELD) {
    previous = null;
  }

  // connect this.blockNode and this.connectionNode
  var provided = this.blockNode;
  var providedBlock = back(provided).getLocation();
  insertPointNode.getLocation().connect(providedBlock);

  // clear the values
  this.connectionNode = null;
  this.blockNode = null;
}

/**
 * The ChangeListener for workspace events. On fire, fully redraws
 * linearization, including parentNav.
 * @param {?Blockly.Events.Abstract=} e undefined by default, the workspace
 * event that triggers this ChangeListener.
 * @private
 */
Blockly.Linearization.prototype.generateList_ = function(e=undefined) {
  var workspace = this.workspace;
  if (!workspace.getAllBlocks().length) {
    this.mainNavList.innerHTML = '';
    return;
  }

  if (e) {
    this.alterSelectedWithEvent_(e);
  }

  this.generateParentNav_(this.selectedNode);

  var navListDiv = this.mainNavList;
  var newDiv = this.selectedNode?
      this.makeNodeList_(this.selectedNode):
      this.makeWorkspaceList_();

  newDiv.setAttribute('id', 'mainNavList');
  navListDiv.parentNode.replaceChild(newDiv, navListDiv);
  this.mainNavList = newDiv;
}

/**
 * Takes a workspace event and uses the type of event to determine the next
 * selectedNode.
 * @param {Blockly.Events.Abstract} e the workspace event that determines the
 * next selectedNode.
 * @private
 */
Blockly.Linearization.prototype.alterSelectedWithEvent_ = function(e) {
  var workspace = this.workspace;
  var node;
  switch (e.type) {
    case Blockly.Events.BLOCK_MOVE:
      var block = workspace.getBlockById(e.blockId);
      node = block && Blockly.ASTNode.createBlockNode(block);
      if (block && this.blockJoiner.connectionNode) {
        try {
          this.blockJoiner.push(node);
        } catch(e) {
          this.blockJoiner.blockNode = null;
        }
      }
      break;
    case Blockly.Events.FINISHED_LOADING:
      node = null;
      break;
    case Blockly.Events.BLOCK_CREATE:
      var block = workspace.getBlockById(e.blockId);
      node = block && Blockly.ASTNode.createBlockNode(block);
      break;
    case Blockly.Events.UI:
      if (e.element !== 'selected' && e.element !== 'click') {
        node = this.selectedNode;
      } else if (!e.blockId) {
        node = null;
      } else {
        var block = workspace.getBlockById(e.blockId);
        node = Blockly.ASTNode.createBlockNode(block);
        if (this.blockJoiner.connectionNode) {
          this.blockJoiner.push(node);
        }
      }
      break;
    case Blockly.Events.BLOCK_DELETE:
      node = null;
      break;
  }

  this.listItemOnclick(node);
}

/**
 * Generates (and replaces) the old parent-nav bar, using color-coded, linked
 * breadcrumbs. Always includes workspace.
 * @param {!Blockly.Workspace} Current workspace
 * @param {?Blockly.ASTNode} rooNode Generates breadcrumbs from rootNode's
 * parentStack up to and including rootNode.
 * @private
 */
Blockly.Linearization.prototype.generateParentNav_ = function(rootNode) {
  var pNav = this.parentNav;
  pNav.innerHTML = '';
  pNav.appendChild(this.makeParentItem_());

  if (rootNode) {
    rootNode.getParentStack(true)
        .filter(node => node.getType() === Blockly.ASTNode.types.BLOCK)
        .reverse()
        .map(this.makeParentItem_.bind(this))
        .forEach(elem => pNav.appendChild(elem));
  }

  if (this.blockJoiner.connectionNode) {
    pNav.appendChild(document.createElement('br'));
    var cancelItem = document.createElement('b');
    cancelItem.appendChild(document.createTextNode('Cancel Move'));
    cancelItem.addEventListener('click', e => {
        this.blockJoiner.connectionNode = null;
        this.generateList_();
    });
    pNav.appendChild(cancelItem);
  }
}

/**
 * Creates and returns the HTML unordered list of labelled stacks with sublists
 * of every block on the same visual indent, represented with list elements
 * @param {!Blockly.Workspace} Current workspace
 * @return {HTMLElement} an html representation of the top level of the current
 * workspace, in the form of an unordered list.
 * @private
 */
Blockly.Linearization.prototype.makeWorkspaceList_ = function() {
  var workspace = this.workspace;
  var wsNode = Blockly.ASTNode.createWorkspaceNode(workspace);
  var wsList = document.createElement('ul');

  // for each stack
  var firstStack = wsNode.in();
  var marker = 'A';
  firstStack.sequence(n => n.next()).forEach(stack => {
    var stackItem = document.createElement('li');
    stackItem.appendChild(document.createTextNode('Stack ' + marker));
    marker = Blockly.Linearization.nextStackMarker(marker);
    var stackItemList = document.createElement('ul');

    // for each block node in the top of the stack
    var firstNode = stack.in();
    if (firstNode.getType() !== Blockly.ASTNode.types.BLOCK) {
      firstNode = firstNode.getFirstSiblingBlock();
    }
    // add a new list element representing the block to the list
    firstNode.sequence(n => n.getFirstSiblingBlock())
      .map(this.makeNodeListElements_.bind(this))
      .forEach(items => stackItemList.append(...items));

    stackItem.appendChild(stackItemList);
    wsList.appendChild(stackItem);
  });

  return wsList;
}

  /**
 * Creates and returns the HTML unordered list of every block on the same visual
 * indent within the rootNode, represented with list elements
 * @param {!Blockly.ASTNode} rootNode the direct parent of all items in the list
 * @return {HTMLElement} an html representation of the top level of the
 * rootNode, in the form of an unordered list.
 * @private
 */
Blockly.Linearization.prototype.makeNodeList_ = function(rootNode) {
  var sublist = document.createElement('ul');
  sublist.appendChild(this.makeGoBackElement_(rootNode));

  var connNode = this.blockJoiner.connectionNode;
  var inlineOutputConn = connNode && connNode.getParentInput() &&
      connNode.getParentInput().type === Blockly.INPUT_VALUE;


  var prevConn = rootNode.prev();
  if (prevConn && connNode) {
    sublist.appendChild(this.makeConnListItem_(rootNode, prevConn,
        inlineOutputConn? 'Tack me on side of': 'Insert me below',
        'Insert above me'));
  }

  var inline = rootNode.getFirstInlineBlock();
  if (inline) {
    var inlineSeq = inline.sequence(Blockly.Linearization.nextInlineInput);
    inlineSeq.map(this.makeInputListElement_.bind(this))
      .filter(n => n)
      .forEach(elem => sublist.appendChild(elem));
  }

  if (rootNode.getLocation().mutator) {
    sublist.append(...this.makeAllMutatorElements_(rootNode));
  }

  var inNode = rootNode.in();
  while (inNode && inNode.getType() !== Blockly.ASTNode.types.INPUT) {
    inNode = inNode.next();
  }

  // TODO: add back conns of type Blockly.ASTNode.types.INPUT
  // if (this.mode === this.SelectionMode.EDIT && !connNode && inNode) {
  //   sublist.append(...this.makeAllInnerInputElements_(inNode));
  // }

  var firstNested = rootNode.getFirstNestedBlock();
  if (firstNested) {
    firstNested.sequence(n => n.getFirstSiblingBlock())
        .map(this.makeNodeListElements_)
        .forEach(elems => sublist.append(...elems));
  } else if (/*this.mode === this.SelectionMode.EDIT && */!connNode && inNode) {
      sublist.append(...this.makeAllInnerInputElements_(inNode));
  }

  // var nextConn = rootNode.next();
  // if (this.mode === this.SelectionMode.EDIT && nextConn) {
  //   sublist.appendChild(this.makeConnListItem_(rootNode, nextConn,
  //     inlineOutputConn? 'XX Tack me on side of': 'XX Insert me above',
  //     'XX Insert below me'));
  // }

  return sublist;
}

/**
 * Returns all inner input nodes as a array of html elements, starting with
 * inNode.
 * @param {!Blockly.ASTNode} inNode the first inner input element to convert
 * @return {Array<HTMLElement>} an array containing all inner input elements
 * encoded as html list items
 * @private
 */
Blockly.Linearization.prototype.makeAllInnerInputElements_ = function(inNode) {
  var inNodeSeq = inNode.sequence(n => n.next());
  var counter = { // used mainly for if/elseif/else statements
    tackVal: 1,
    insertVal: 1,
    tackText: () => (inNodeSeq.length == 1)? '': ' ' + counter.tackVal++,
    insertText: () => (inNodeSeq.length == 1)? '':' ' + counter.insertVal++
  }

  return inNodeSeq.map(n => this.makeBasicConnListItem_(
            n,
            n.getParentInput() && n.getParentInput().type === Blockly.INPUT_VALUE?
                'Tack on side' + counter.tackText():
                'Insert within' + counter.insertText())
          );
}

/**
 * Returns all mutator options for the block rootNode wraps in an array.
 * @param {!Blockly.ASTNode} rootNode node containing the block with mutator
 * @return {Array<HTMLElement>} an array containing all mutator options encoded
 * as html list items.
 * @private
 */
Blockly.Linearization.prototype.makeAllMutatorElements_ = function(rootNode) {
  var block = rootNode.getLocation();
  var list = [];

  if (block.elseifCount_ != undefined) {
    list.push(this.makeMutatorListElement_(rootNode, 'Add elseif', block => {
      block.elseifCount_++;
      block.rebuildShape_();
    }));

    if (block.elseifCount_ > 0) {
      list.push(this.makeMutatorListElement_(rootNode, 'Remove elseif',
      block => {
        block.elseifCount_--;
        block.rebuildShape_();
      }));
    }
  }

  if (block.elseCount_ === 0) {
    list.push(this.makeMutatorListElement_(rootNode, 'Add else', block => {
      block.elseCount_++;
      block.rebuildShape_();
    }));
  } else if (block.elseCount_ === 1) {
    list.push(this.makeMutatorListElement_(rootNode, 'Remove else', block => {
      block.elseCount_--;
      block.rebuildShape_();
    }));
  }

  if (block.itemCount_ != undefined) {
    list.push(this.makeMutatorListElement_(rootNode, 'Add item', block => {
      block.itemCount_++;
      block.updateShape_();
    }));

    if (block.itemCount_ > 1) {
      list.push(this.makeMutatorListElement_(rootNode, 'Remove item', block => {
        block.itemCount_--;
        block.updateShape_();
      }));
    }
  }

  if (block.arguments_ != undefined) {
    list.push(this.makeMutatorListElement_(rootNode, 'Add argument', block => {
      var argname;
      if (block.arguments_.length) {
        var lastArg = block.arguments_[block.arguments_.length - 1];
        argname = (lastArg.length > 5)? lastArg:
          Blockly.Linearization.nextStackMarker(lastArg);
      } else {
        argname = 'A';
      }

      while (block.arguments_.includes(argname)) {
        argname += 'I';
      }

      block.arguments_.push(argname);
      block.updateParams_();
      this.listItemOnclick(rootNode);
    }));

    block.arguments_.forEach(arg => {
      var elem = Blockly.Linearization.makeListTextElement_(
        'Argument \"' + arg + '\"');
      elem.contentEditable = true;
      elem.addEventListener('focus', (e) => elem.innerText = arg);
      elem.addEventListener('blur', (event) => {
        if (elem.innerText === "") {
          block.arguments_.splice(block.arguments_.indexOf(arg), 1);
          block.updateParams_();
          listItemOnclick(rootNode);
        } else {
          block.arguments_.splice(
            block.arguments_.indexOf(arg), 1, elem.innerText);
          block.updateParams_();
        }
      });

      list.push(elem);
    })
  }

  return list;
}

/**
 * Returns an html list item that encodes the mutator option defined by text,
 * with source node rootNode, and onclick listener innerFn that accepts
 * rootNode.getLocation(). (listItemOnclick(rootNode) is performed
 * automatically.)
 * @param {!Blockly.ASTNode} rootNode node containing the block with mutator
 * @param {!string} text option text
 * @param {!function(Blockly.Block)} additional onclick listener that accepts
 * rootNode.getLocation()
 * @return {HTMLElement} an html list item encoding the mutator option defined
 * by rootNode and text, with onclick behavior innerFn(rootNode.getLocation())
 * @private
 */
Blockly.Linearization.prototype.makeMutatorListElement__ = function(rootNode, text, innerFn) {
  var block = rootNode.getLocation();
  var elem = Blockly.Linearization.makeListTextElement_(text);
  elem.addEventListener('click', e => {
    innerFn(block);
    this.listItemOnclick(rootNode);
  })
  return elem;
}

/**
 * Returns the appropriate html list item for the connection,
 * attempting to validate the connection if such a connection is possible
 * @param {!Blockly.ASTNode} rootNode the current selectedNode from which
 * candidate is being collected
 * @param {!Blockly.ASTNode} candidate the item to validate for completing the
 * connection in this.blockJoiner, a child node of rootNode
 * @param {!string} text the text stub which describes the nature of the action
 * this item represents if the connection to candidate is valid
 * @param {!string} alttext the text stub which describes the nature of the action
 * this item represents if the connection to candidate is not valid
 * @return {HTMLElement} the appropriate html element to represent this
 * potential connection
 * @private
 */
Blockly.Linearization.prototype.makeConnListItem_ = function(rootNode, candidate, text, alttext) {
  var connNode = this.blockJoiner.connectionNode;
  if (!connNode) {
      return this.makeBasicConnListItem_(candidate, alttext);
  }

  var conn = connNode.getLocation();
  var check = conn.canConnectWithReason_(candidate.getLocation());
  if (check === Blockly.Connection.CAN_CONNECT) {
    var label = text + ' ' + conn.getSourceBlock().makeAriaLabel();
    return this.makeBasicConnListItem_(rootNode, label);
  } else if (check === Blockly.Connection.REASON_SELF_CONNECTION) {
    var item = Blockly.Linearization.makeListTextElement_('Cancel insert');
    item.addEventListener('click', e => {
      this.blockJoiner.connectionNode = null;
      this.generateList_();
    });
    return item;
  }

  return this.makeBasicConnListItem_(candidate, alttext);
}

/**
 * Returns a list text element with a unique id and block id of the node
 * passed it, as well as a custom onclick listener that pushes the attached node
 * to the this.blockJoiner and regenerate's the list
 * @param {!Blockly.ASTNode} node the node that contains the connection this
 * html element represents
 * @param {!string} text the text for this list item
 * @return {HTMLElement} a clickable list item that represents the connection
 * @private
 */
Blockly.Linearization.prototype.makeBasicConnListItem_ = function(node, text) {
  var item = Blockly.Linearization.makeListTextElement_(text);
  var connection = node.getLocation();
  item.id = "li" + connection.id;
  item.blockId = connection.id;
  item.addEventListener('click', e => {
    this.blockJoiner.push(node);
    this.selectedNode = null;
    this.generateList_();
  });
  return item;
}

/**
 * Creates and returns the color-coded, linked HTML bold text of a parent block
 * used in parent-nav.
 * @param {?Blockly.ASTNode=} node undefined by default, a parent node. If null,
 * creates the workspace ParentItem.
 * @return {HTMLElement} an html representation of node as a parent
 * @private
 */
Blockly.Linearization.prototype.makeParentItem_ = function(node=undefined) {
  var item = document.createElement('b');
  var labelText = Blockly.Linearization.getNodeLabel(node);
  item.appendChild(document.createTextNode(labelText + ' > '));
  if (node) {
    item.setAttribute('style',
          'color:hsl(' + node.getLocation().getHue() + ', 40%, 40%)');
  }
  item.setAttribute('aria-label', 'Jump to ' + labelText);
  item.addEventListener('click', e => this.listItemOnclick(node));
  return item;
}

/**
 * Creates and returns the appropriately edittable HTML ListElement of node.
 * @param {!Blockly.ASTNode} node the input/field to represent
 * @return {HTMLElement} an edittable html representation of node
 * @private
 */
Blockly.Linearization.prototype.makeInputListElement_ = function(node) {
  var location = node.getLocation();
  switch (node.getType()) {
    case Blockly.ASTNode.types.FIELD:
      if (location instanceof Blockly.FieldDropdown) {
        return this.makeDropdownElement_(location);
      } else if (location instanceof Blockly.FieldNumber || location instanceof Blockly.FieldTextInput) {
        return this.makeEdittableFieldElement_(location);
      } else {
        return Blockly.Linearization.makeListTextElement_('field but neither dropdown nor number');
      }
    case Blockly.ASTNode.types.INPUT:
      if (location.targetConnection) {
        var targetInputs = location.targetConnection.getSourceBlock().inputList;
        if (targetInputs.length === 1 && (targetInputs[0].fieldRow[0] instanceof Blockly.FieldNumber)) {
          return this.makeEdittableFieldElement_(targetInputs[0]);
        }
        var targetBlockNode = node.in().next();
        return this.makeBasicListElement_(targetBlockNode);
      }
      return Blockly.Linearization.makeListTextElement_('add block inline');
    case Blockly.ASTNode.types.OUTPUT:
      break;
    default:
      console.log('uncaught');
      console.log(node);
      break;
  }
  return null;
}

/**
 * Returns an ordered Array of linked html list items that represent the
 * movement options of the node and the node itself
 * @param {!Blockly.ASTNode} node the node to represent
 * @return {Array<HTMLElement>} the html representation of node and its options
 * @private
 */
Blockly.Linearization.prototype.makeNodeListElements_ = function(node) {
  var list = [];

  var prevConn = node.prev();
  var dispPrev = prevConn &&
      (!prevConn.prev() || prevConn.prev().getType() !== Blockly.ASTNode.types.NEXT);
  if (dispPrev && prevConn.getType() === Blockly.ASTNode.types.PREVIOUS) {
    list.push(this.makeBasicConnListItem_(node.prev(), 'Insert above'));
  }

  if (node.getLocation().type === 'controls_if') {
    list.push(...this.makeIfListElements_(node));
  } else {
    list.push(this.makeBasicListElement_(node));
    if (this.selectedNode) {
      this.selectedNode.sub_block = null;
    }
  }

  if (node.next() && node.next().getType() === Blockly.ASTNode.types.NEXT) {
    var last = !node.next().next() ||
        node.next().next().getType() !== Blockly.ASTNode.types.PREVIOUS;
    var text = last? 'Insert below': 'Insert between';
    list.push(this.makeBasicConnListItem_(node.next(), text));
  }

  return list;
}

Blockly.Linearization.prototype.makeIfListElements_ = function(node) {
  var list = [];
  list.push(this.makeBasicListElement_(node));
  list.push(Blockly.Linearization.makeListTextElement_('if opts here'))
  return list;
}

/**
 * Creates and returns the standard ListElement for the block in node, labelled
 * with text equivalent to node.getLocation().makeAriaLabel().
 * Attributes include a unique id and blockId for the associated block, as well
 * adding the standard listItemOnclick(node) event listener on click.
 * @param {!Blockly.ASTNode} node the block to represent
 * @return {HTMLElement} an linked html list item representation of node
 * @private
 */
Blockly.Linearization.prototype.makeBasicListElement_ = function(node) {
  var listElem = document.createElement('li');
  var block = node.getLocation();
  listElem.id = "li" + block.id;
  listElem.blockId = block.id;
  listElem.appendChild(document.createTextNode(block.makeAriaLabel()));
  listElem.addEventListener('click', e => this.listItemOnclick(node));
  listElem.setAttribute('style',
          'color:hsl(' + node.getLocation().getHue() + ', 40%, 40%)');
  return listElem;
}

/**
 * Creates and returns a textfield HTML li element linked to node's value.
 * @param {!Blockly.ASTNode} node the node of type field or input containing the item to represent
 * @return {HTMLElement} an html list item that is edittable for number
 * and text fields.
 * @private
 */
Blockly.Linearization.prototype.makeEdittableFieldElement_ = function(node) {
  var listElem;
  try {
    var field = node.fieldRow[0];
  } catch {
    var field = node;
  }
  if (field instanceof Blockly.FieldDropdown) {
    return this.makeDropdownElement_(field)
  }
  var fieldName = field.name;
  if (field.getText() === "") {
    listElem = Blockly.Linearization.makeListTextElement_('[Enter some text]');
  } else {
    listElem = Blockly.Linearization.makeListTextElement_(field.getText());
  }
  listElem.id = "li" + field.getSourceBlock().id;
  listElem.contentEditable = true;
  listElem.addEventListener('blur', function(event) {
    var block = workspace.getBlockById(listElem.id.slice(2));
    block.setFieldValue(listElem.innerText, fieldName);
  });
  listElem.addEventListener('keyup', (event) => {
    event.preventDefault();
    if (event.keyCode === 13) {
      var block = this.workspace.getBlockById(listElem.id.slice(2));
      block.setFieldValue(listElem.innerText, fieldName);
    }
  });
  return listElem;
}

/**
 * Returns the html list element representing field, null if an invalid field
 * @param {!Blockly.FieldDropdown} field the field to represent
 * @return {?HTMLElement} a clickable representation of the field that toggles
 * options through the dropdown option list. If there are no options, null.
 */
Blockly.Linearization.prototype.makeDropdownElement_ = function(field) {
  var options = field.getOptions();
  if (!options.length) {
    return null;
  }
  var entry;
  for (var i = 0, option; option = options[i]; i++) {
    if (option[1] === field.getValue()) {
      entry = [i, option];
    }
  }
  if (!entry) {
    entry = [0, field.getOptions()[0]];
  }
  var elem = Blockly.Linearization.makeListTextElement_('Field: ' + entry[1][0]);
  elem.setAttribute('aria-label', 'Field: ' + entry[1][0] + ', click to change');
  elem.setAttribute('index', entry[0]);
  elem.addEventListener('click', e => {
    var newIndex = (parseInt(elem.getAttribute('index')) + 1)
        % field.getOptions().length;
    var option = field.getOptions()[newIndex];
    var textNode = document.createTextNode('Field: ' + option[0]);
    elem.setAttribute('aria-label', 'Field: ' + option[0] + ', click to change');
    elem.replaceChild(textNode, elem.firstChild);
    elem.setAttribute('index', newIndex);
    Blockly.Events.disable();
    // TODO: fix me, so very sad
    try {
      field.setValue(option[1]);
      this.generateParentNav_(this.selectedNode);
    } catch (e) {
      //
    } finally {
      Blockly.Events.enable();
    }
  });
  return elem;
}

/**
 * Creates and returns a linked HTML li element linked to node's direct visual
 * parent.
 * @param {!Blockly.ASTNode} node the child node of the parent to go back to
 * @return {HTMLElement} an html list item that will navigate to the direct
 * visual parent block
 */
Blockly.Linearization.prototype.makeGoBackElement_ = function(node) {
  var returnNode = document.createElement('li');
  var outNode = node.out();
  while (outNode && outNode.getType() !== 'block') {
    outNode = outNode.out();
  }
  var labelText = 'Go back to ' + Blockly.Linearization.getNodeLabel(outNode);
  returnNode.appendChild(document.createTextNode(labelText));
  returnNode.addEventListener('click', e => this.listItemOnclick(outNode));
  return returnNode;
}

/**
 * The standard onclick action for ListElements. Highlights the node's block if
 * node is not null, sets the selectedNode to node, and calls generateList_().
 * @param {?Blockly.ASTNode} node the node to navigate to and highlight
 */
Blockly.Linearization.prototype.listItemOnclick = function(node) {
  this.highlightBlock(node && node.getLocation());
  this.selectedNode = node;
  this.generateList_();
}

/**
 * Highlights block if block is not null. Sets lastHighlighted to block.
 * @param {?Blockly.ASTNode} block block to highlight, null if none
 */
Blockly.Linearization.prototype.highlightBlock = function(block) {
  this.clearHighlighted();
  if (block) {
    block.setHighlighted(true);
  }
  this.lastHighlighted = block;
}

/**
 * Unhighlights lastHighlighted, if lastHighlighted is not null.
 */
Blockly.Linearization.prototype.clearHighlighted = function() {
  if (this.lastHighlighted) {
    this.lastHighlighted.setHighlighted(false);
  }
}

/**
 * Creates and returns an HTML li element with a text node reading text.
 * @param {!String} text the text on the list item
 * @return {HTMLElement} an html list item with text node text
 * @private
 */
Blockly.Linearization.makeListTextElement_ = function(text) {
    var listElem = document.createElement('li');
    listElem.appendChild(document.createTextNode(text));
    return listElem;
  }

/**
 * Creates and returns the next label in lexicographic order, adding a letter in
 * the event of overflow.
 * @param {!String} marker the last node created
 * @return {String} the next label after marker in lexicographic order
 */
Blockly.Linearization.nextStackMarker = function(marker) {
  var lastIndex = marker.length - 1;
  var prefix = marker.slice(0, lastIndex);
  if (marker.charCodeAt(lastIndex) === 'Z'.charCodeAt(0)) {
    return (prefix? this.nextStackMarker(prefix): 'A') + 'A';
  }
  return prefix + String.fromCharCode(marker.charCodeAt(lastIndex) + 1);
}

/**
 * Creates and returns the aria label for node if
 * node.getLocation().makeAriaLabel is not null, 'workspace' if otherwise.
 * @param {?Blockly.ASTNode} node the node to get aria-label from
 * @return {String} the string generated by node.getLocation().makeAriaLabel()
 */
Blockly.Linearization.getNodeLabel = function(node) {
  return node && node.getLocation().makeAriaLabel?
      node.getLocation().makeAriaLabel(): 'workspace';
}

/**
 * Seeks the next inline input on node's AST parent after node itself.
 * @param {!Blockly.ASTNode} node the last sibiling searched
 * @return {Blockly.ASTNode} the first inline sibling after node, null if none.
 */
Blockly.Linearization.nextInlineInput = function(node) {
  var next = node.next();
  if (next && next.getType() === Blockly.ASTNode.types.FIELD) {
    return next;
  }
  if (next && next.in() &&
     next.in().getType() != Blockly.ASTNode.types.PREVIOUS) {
    return next;
  }
  return null;
}

// Unused code
//
// /**
//  * Returns all blocks in the main workspace encapsulated in nodes.
//  * @return {Array<Blockly.ASTNode>} all possible nodes from the main workspace
//  */
// function getAllNodes() {
//     var ws = Blockly.getMainWorkspace();
//     var curNode = Blockly.ASTNode.createWorkspaceNode(ws, new goog.math.Coordinate(100,100));
//     var nodes = [];
//     do {
//       nodes.push(curNode);
//       curNode = treeTraversal(curNode);
//     } while (curNode);
//     return nodes;
// }
//
// /**
//  * Decides what nodes to traverse and which ones to skip. Currently, it
//  * skips output, stack and workspace nodes.
//  * @param {Blockly.ASTNode} node The ast node to check whether it is valid.
//  * @return {Boolean} True if the node should be visited, false otherwise.
//  * @package
//  */
// function validNode(node) {
//   var isValid = false;
//   if (node && (node.getType() === Blockly.ASTNode.types.BLOCK
//     || node.getType() === Blockly.ASTNode.types.INPUT
//     || node.getType() === Blockly.ASTNode.types.FIELD
//     || node.getType() === Blockly.ASTNode.types.NEXT
//     || node.getType() === Blockly.ASTNode.types.PREVIOUS)) {
//       isValid = true;
//   }
//   return isValid;
// }
//
// /**
//  * From the given node find either the next valid sibling or parent.
//  * @param {Blockly.ASTNode} node The current position in the ast.
//  * @return {Blockly.ASTNode} The parent ast node or null if there are no
//  * valid parents.
//  * @package
//  */
// function findSiblingOrParent(node) {
//   if (!node) {
//     return null;
//   }
//   var nextNode = node.next();
//   if (nextNode) {
//     return nextNode;
//   }
//   return findSiblingOrParent(node.out());
// }
//
// /**
//  * Uses pre order traversal to go navigate the blockly ast. This will allow
//  * a user to easily navigate the entire blockly AST without having to go in
//  * and out levels on the tree.
//  * @param {Blockly.ASTNode} node The current position in the ast.
//  * @return {Blockly.ASTNode} The next node in the traversal.
//  * @package
//  */
// function treeTraversal(node, takeNode=validNode) {
//   if (!node) {
//     return null;
//   }
//   var newNode = node.in() || node.next();
//   if (takeNode(newNode)) {
//     return newNode;
//   } else if (newNode) {
//     return treeTraversal(newNode, takeNode);
//   } else {
//     var siblingOrParent = findSiblingOrParent(node);
//     if (takeNode(siblingOrParent)) {
//       return siblingOrParent;
//     } else if (siblingOrParent
//       && siblingOrParent.getType() !== Blockly.ASTNode.types.WORKSPACE) {
//       return treeTraversal(siblingOrParent, takeNode);
//     }
//   }
// }
// /**
//  * Finds the next node in the tree traversal starting at the location of
//  * the cursor.
//  * @return {Blockly.ASTNode} The next node in the traversal.
//  * @package
//  */
// function findNext() {
//     var cursor = Blockly.Navigation.cursor_;
//     var curNode = cursor.getCurNode();
//     return treeTraversal(curNode);
// }
