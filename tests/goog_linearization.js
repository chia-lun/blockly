/**
 * @fileoverview The class for generating accessible linearization
 * of a workspace.
 */

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
  workspace.addChangeListener(this.generateList_);
}

/**
 * Class to manage requests for blocks from connections, and vice-versa.
 * Allows for a single connection request and a single block request at a time.
 * @constructor
 */
Blockly.Linearization.BlockJoiner = function() {
  // I'm aware this does nothing, but I don't know if the constructor would
  // work otherwise
  this.blockNode = null;
  this.connectionNode = null;
};

/**
 * Attempt to fill the request for this item. item must be Blockly.Block or
 * Blockly.Connection.
 * @param {Block.ASTNode} item
 * @return {boolean} true if successfully pushed, false if request fails
 */
Blockly.Linearization.BlockJoiner.prototype.push = function() {
  if (item.getLocation() instanceof Blockly.Block) {
    this.blockNode = item;
  } else if (item.getLocation() instanceof Blockly.Connection) {
    this.connectionNode = item;
  } else {
    return false;
  }

  this.service_();
  return true;
};

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

  // restich any cuts made by connecting the nodes
  // if (previous && previous.getLocation) {
  //   var sutureNode = advance(provided);
  //   if (sutureNode && sutureNode.getLocation) {
  //     try {
  //       previous.getLocation().connect(sutureNode.getLocation())
  //     } catch(e) {
  //       console.log('suture failed...');
  //       console.log(e);
  //     }
  //   }
  // }

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
  console.log(this);
  var workspace = this.workspace;
  if (!workspace.getAllBlocks().length) {
    this.mainNavList.innerHTML = '';
    return;
  }
  console.log(this);
  if (e) {
    this.alterSelectedWithEvent(e);
  }

  this.generateParentNav_(this.selectedNode);

  var navListDiv = this.mainNavList;
  var newDiv = this.selectedNode?
      this.makeNodeList(this.selectedNode):
      this.makeWorkspaceList();

  newDiv.setAttribute('id', 'mainNavList');
  navListDiv.parentNode.replaceChild(newDiv, navListDiv);
  this.mainNavList = newDiv;
}

/**
 * Takes a workspace event and uses the type of event to determine the next
 * selectedNode.
 * @param {Blockly.Events.Abstract} e the workspace event that determines the
 * next selectedNode.
 */
Blockly.Linearization.prototype.alterSelectedWithEvent = function(e) {
  var workspace = this.workspace;
  var node;
  switch (e.type) {
    case Blockly.Events.BLOCK_MOVE:
      var block = workspace.getBlockById(e.blockId);
      node = block && Blockly.ASTNode.createBlockNode(block);
      if (this.blockJoiner.connectionNode) {
        this.blockJoiner.push(node);
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
  pNav.appendChild(makeParentItem());

  if (rootNode) {
    rootNode.getParentStack(true)
        .filter(node => node.getType() === Blockly.ASTNode.types.BLOCK)
        .reverse()
        .map(makeParentItem)
        .forEach(elem => pNav.appendChild(elem));
  }

  if (this.blockJoiner.connectionNode) {
    pNav.appendChild(document.createElement('br'));
    var cancelItem = document.createElement('b');
    cancelItem.appendChild(document.createTextNode('Cancel Move'));
    cancelItem.addEventListener('click', e => {
        this.blockJoiner.connectionNode = null;
        generateList();
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
 */
Blockly.Linearization.prototype.makeWorkspaceList = function() {
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
      .map(Blockly.Linearization.makeListElement)
      .forEach(node => stackItemList.appendChild(node));

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
 */
Blockly.Linearization.prototype.makeNodeList = function(rootNode) {
  var sublist = document.createElement('ul');
  sublist.appendChild(makeGoBackElement(rootNode));

  var connNode = this.blockJoiner.connectionNode;
  var inlineOutputConn = connNode && connNode.getParentInput() &&
      connNode.getParentInput().type === Blockly.INPUT_VALUE;

  var prevConn = rootNode.prev();
  if (prevConn) {
    sublist.appendChild(makeConnListItem(rootNode, prevConn,
        inlineOutputConn? 'Tack me on side of': 'Insert me below',
        'Insert above me'));
  }

  var inline = rootNode.getFirstInlineBlock();
  if (inline) {
    var inlineSeq = inline.sequence(nextInlineInput);
    inlineSeq.map(makeInputListElement)
      .filter(n => n)
      .forEach(elem => sublist.appendChild(elem));
  }

  var inNode = rootNode.in();
  while (inNode && inNode.getType() !== Blockly.ASTNode.types.INPUT) {
    inNode = inNode.next();
  }

  if (!connNode && inNode) {
    sublist.append(...makeAllInnerInputElements(inNode));
  }

  if (rootNode.getLocation().mutator) {
    sublist.append(...makeAllMutatorElements(rootNode));
  }

  var firstNested = rootNode.getFirstNestedBlock();
  if (firstNested) {
    firstNested.sequence(n => n.getFirstSiblingBlock())
        .map(makeListElement)
        .forEach(elem => sublist.appendChild(elem));
  }

  var nextConn = rootNode.next();
  if (nextConn) {
    sublist.appendChild(makeConnListItem(rootNode, nextConn,
      inlineOutputConn? 'Tack me on side of': 'Insert me above',
      'Insert below me'));
  }

  return sublist;
}

/**
 * Returns all inner input nodes as a array of html elements, starting with
 * inNode.
 * @param {!Blockly.ASTNode} inNode the first inner input element to convert
 * @return {Array<HTMLElement>} an array containing all inner input elements
 * encoded as html list items
 */
Blockly.Linearization.prototype.makeAllInnerInputElements = function(inNode) {
  var inNodeSeq = inNode.sequence(n => n.next()).filter(n => n);
  var counter = { // used mainly for if/elseif/else statements
    tackVal: 1,
    insertVal: 1,
    tackText: () => (inNodeSeq.length == 1)? '': ' ' + counter.tackVal++,
    insertText: () => (inNodeSeq.length == 1)? '':' ' + counter.insertVal++
  }
  return inNodeSeq.map(n => this.makeBasicConnListItem(
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
 */
Blockly.Linearization.prototype.makeAllMutatorElements = function(rootNode) {
  var block = rootNode.getLocation();
  var list = [];

  if (block.elseifCount_ != undefined) {
    list.push(this.makeMutatorListElement(rootNode, 'Add elseif', block => {
      block.elseifCount_++;
      block.rebuildShape_();
    }));

    if (block.elseifCount_ > 0) {
      list.push(this.makeMutatorListElement(rootNode, 'Remove elseif',
      block => {
        block.elseifCount_--;
        block.rebuildShape_();
      }));
    }
  }

  if (block.elseCount_ === 0) {
    list.push(this.makeMutatorListElement(rootNode, 'Add else', block => {
      block.elseCount_++;
      block.rebuildShape_();
    }));
  } else if (block.elseCount_ === 1) {
    list.push(this.makeMutatorListElement(rootNode, 'Remove else', block => {
      block.elseCount_--;
      block.rebuildShape_();
    }));
  }

  if (block.itemCount_ != undefined) {
    list.push(this.makeMutatorListElement(rootNode, 'Add item', block => {
      block.itemCount_++;
      block.updateShape_();
    }));

    if (block.itemCount_ > 1) {
      list.push(this.makeMutatorListElement(rootNode, 'Remove item', block => {
        block.itemCount_--;
        block.updateShape_();
      }));
    }
  }

  if (block.arguments_ != undefined) {
    list.push(this.makeMutatorListElement(rootNode, 'Add argument', block => {
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
      elem = Blockly.Linearization.makeListTextElement(
        'Argument \"' + arg + '\"');
      elem.contentEditable = true;
      elem.addEventListener('focus', (e) => elem.innerText = arg);
      elem.addEventListener('blur', function(event) {
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
 */
Blockly.Linearization.prototype.makeMutatorListElement = function(
    rootNode, text, innerFn) {
  var block = rootNode.getLocation();
  var elem = Blockly.Linearization.makeListTextElement(text);
  elem.addEventListener('click', e => {
    innerFn(block);
    this.listItemOnclick(rootNode);
  })
  return elem;
}

// TODO: write documentation
Blockly.Linearization.prototype.makeConnListItem = function(
    rootNode, candidate, text, alttext) {
  var connNode = this.blockJoiner.connectionNode;
  if (!connNode) {
      return this.makeBasicConnListItem(candidate, alttext);
  }

  var conn = connNode.getLocation();
  var check = conn.canConnectWithReason_(candidate.getLocation());
  if (check === Blockly.Connection.CAN_CONNECT) {
    var label = text + ' ' + conn.getSourceBlock().makeAriaLabel();
    return this.makeBasicConnListItem(rootNode, label);
  } else if (check === Blockly.Connection.REASON_SELF_CONNECTION) {
    var item = Blockly.Linearization.makeListTextElement('Cancel insert');
    item.addEventListener('click', e => {
      this.blockJoiner.connectionNode = null;
      this.generateList_();
    });
    return item;
  }

  return this.makeBasicConnListItem(candidate, alttext);
}

// TODO: write documentation
Blockly.Linearization.prototype.makeBasicConnListItem = function(node, text) {
  var item = Blockly.Linearization.makeListTextElement(text);
  var connection = node.getLocation();
  item.id = "li" + connection.id;
  item.blockId = connection.id;
  item.addEventListener('click', e => {
    this.blockJoiner.push(node);
    this.selectedNode = null;
    this.generateList();
  });
  return item;
}

/**
 * Creates and returns the color-coded, linked HTML bold text of a parent block
 * used in parent-nav.
 * @param {?Blockly.ASTNode=} node undefined by default, a parent node. If null,
 * creates the workspace ParentItem.
 * @return {HTMLElement} an html representation of node as a parent
 */
Blockly.Linearization.prototype.makeParentItem = function(node=undefined) {
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
 */
Blockly.Linearization.prototype.makeInputListElement = function(node) {
  var location = node.getLocation();
  switch (node.getType()) {
    case Blockly.ASTNode.types.FIELD:
      if (location instanceof Blockly.FieldDropdown) {
        return this.makeDropdownElement(location);
      }
      // non-dropdown field
      return Blockly.Linearization.makeListTextElement('field but not a dropdown');
    case Blockly.ASTNode.types.INPUT:
      if (location.targetConnection) {
        var targetInputs = location.targetConnection.getSourceBlock().inputList;
        if (targetInputs.length === 1) {
          return this.makeEdittableFieldElement(targetInputs[0]);
        }
        var targetBlockNode = node.in().next();
        return this.makeListElement(targetBlockNode);
      }
      return Blockly.Linearization.makeListTextElement('add block inline');
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
 * Creates and returns the standard ListElement for the block in node, labelled
 * with text equivalent to node.getLocation().makeAriaLabel().
 * Attributes include a unique id and blockId for the associated block, as well
 * adding the standard listItemOnclick(node) event listener on click.
 * @param {!Blockly.ASTNode} node the block to represent
 * @return {HTMLElement} an linked html list item representation of node
 */
Blockly.Linearization.prototype.makeListElement = function(node) {
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
 * @param {!Blockly.ASTNode} input the input containing the item to represent
 * @return {HTMLElement} an html list item that is edittable for number
 * and text fields.
 */
Blockly.Linearization.prototype.makeEdittableFieldElement = function(input) {
  var listElem;
  if (input.fieldRow.length === 1) {
    var field = input.fieldRow[0];
    if (field instanceof Blockly.FieldDropdown) {
      return this.makeDropdownElement(field)
    }
    var fieldName = field.name;
    listElem = Blockly.Linearization.makeListTextElement(field.getText());
    listElem.id = "li" + field.getSourceBlock().id;
    listElem.contentEditable = true;
    listElem.addEventListener('keyup', function(event) {
      event.preventDefault();
      if (event.keyCode === 13) {
        var block = this.workspace.getBlockById(listElem.id.slice(2));
        block.setFieldValue(listElem.innerText, fieldName);
      }
    });
  } else {
    listElem = Blockly.Linearization.makeListTextElement('more than 1 field');
  }
  return listElem;
}

// TODO: fix me! write docs
Blockly.Linearization.prototype.makeDropdownElement = function(field) {
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
  var elem = Blockly.Linearization.makeListTextElement('Field: ' + entry[1][0]);
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
Blockly.Linearization.prototype.makeGoBackElement = function(node) {
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
 * node is not null, sets the selectedNode to node, and calls generateList().
 * @param {?Blockly.ASTNode} node the node to navigate to and highlight
 */
Blockly.Linearization.prototype.listItemOnclick = function(node) {
  highlightBlock(node && node.getLocation());
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
 */
Blockly.Linearization.makeListTextElement = function(text) {
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
    return (prefix? nextStackMarker(prefix): 'A') + 'A';
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