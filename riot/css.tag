var OptsMixin = {
updateData: function(){
}
}

<css-space>
  <div class="css-space"></div>
</css-space>

<css-indent>
  <div class="css-indent"></div>
</css-indent>

<css-curly-bracket>
  <div>{ opts.right_or_left_bracket }</div>
</css-curly-bracket>

<!--
 opts,property
 opts,property_list: for Awesom's suggestion list
-->
<css-property>
  <div if={!edit} onClick={toEditMode}>{opts.property}</div>

    <div  if={edit}>
      <input class="css-editor-input"
             name="input"
             onBlur={toUnEditMode}
             onChange={toUnEditMode}
             onKeyPress={keyPress}>
    </div>
  <script>
    toEditMode(event)
    {
      this.edit = true
      this.input.value = opts.property
    }

    toUnEditMode(event)
    {
      this.parent.setProperty(this.input.value) //TODO: better update the entire CSS data structure to reduce state?
      this.edit = false
    }

    keyPress(event)
    {
      if (event.charCode === 13) {
        this.parent.setProperty(this.input.value)//TODO: better update the entire CSS data structure to reduce state?
        this.edit = false
      }
      else {
        //http://riotjs.com/guide/#event-handlers
        //returning true calls the default onKeyPress handler
        return true
      }
    }

    this.on('updated', function(){
      if(this.edit){
        if(this.awesome === undefined ){
          var awesomParams =  {list: opts.list, minChars: 0}
          this.awesome = new Awesomplete(this.input, awesomParams);
          this.awesome.evaluate();
        }
        this.input.focus()
      }
    })

//    //TODO: isn't this needed?
//    this.on('awesomplete-selectcomplete', function(){
//      opts.property = this.input.value //TODO: better update the entire CSS data structure to reduce state?
//      this.edit = false
//    })
  </script>
</css-property>

<!--
 opts,value
 opts,value_list:    for Awesom's suggestion list
-->
<css-value>
  <div if={!edit} onClick={toEditMode}>{opts.value}</div>

  <div if={edit}>
    <input class="css-editor-input"
           name="input"
           onBlur={toUnEditMode}
           onChange={toUnEditMode}
           onKeyPress={keyPress}>
  </div>
  <script>
    function colorElement(text, input) {
      var split = text.split(",");
      var colorHex = split[0]
      var colorName = split[split.length - 1];
      var element = document.createElement("li");
      element.innerHTML = colorHex + " " + colorName;
      element.style.backgroundColor = colorHex;
      return element;
    };

    toEditMode(event)
    {
      this.edit = true
      this.input.value = opts.value
    }

    toUnEditMode(event)
    {
      this.parent.setValue(this.input.value) //TODO: better update the entire CSS data structure to reduce state?
      this.edit = false
    }

    keyPress(event)
    {
      if (event.charCode === 13) {
        this.parent.setValue(this.input.value) //TODO: better update the entire CSS data structure to reduce state?
        this.edit = false
      }
      else {
        //http://riotjs.com/guide/#event-handlers
        //returning true calls the default onKeyPress handler
        return true
      }
    }

    this.on('updated', function(){
      if(this.edit){
        if(this.awesome === undefined ){
          var awesomParams =  {list: opts.list, minChars: 0,  item: colorElement}
          this.awesome = new Awesomplete(this.input, awesomParams);
          this.awesome.evaluate();
        }
        this.input.focus()
      }
    })

    </script>
</css-value>

<!--
 opts,property
 opts,value
 opts,property_list: for Awesom's suggestion list
 opts,value_list:    for Awesom's suggestion list
-->
<css-declaration>
  <div name="line" class="css-line css-editor-declaration">
    <div           class="css-editor-indent"></div>
    <css-property  class="css-editor-property" property={opts.property} list="{opts.property_list}"></css-property>
    <div           class="css-editor-colon">:</div>
    <css-value     class="css-editor-value"    value={opts.value}       list="{opts.value_list}"></css-value>
    <div           class="css-editor-semicolon"><span>;</span></div>
    <button        class="css-delete-button" onClick={deleteLine} >x</button>
  </div>
  <script>
    this.deleteLine = function(){
      this.line.className += " delete";
      //TODO really delete itself, not just set height = 0
    }

    this.setProperty = function(property) {
      opts.property = property;
    }

    this.setValue = function(value) {
      opts.value = value;
    }
  </script>
</css-declaration>


<css-selector>
</css-selector>


<css-line>

  <!-- Polymorphism: CSS line is either of them below -->
  <css-selector opts=></css-selector>
  <script>
    console.log(opts.plan);
  </script>
</css-line>

<css-selector>
  <div class="css-editor-selector animated infinite flash-background" onclick="showSelector(this)">
    <div>#box1</div>
  </div>
</css-selector>


<css-dec>
  <div class="css-line css-editor-declaration">
    <div class="css-editor-indent"></div>
    <div class="css-editor-property animated infinite flash-background" onclick="showPropertyInput(this)">
      <div>background-color</div>
    </div>
    <div class="css-editor-colon">:</div>
    <div class="css-editor-value animated infinite flash-background" onclick="showColorInput(this)">
      <div>blue</div>
    </div>
    <div class="css-editor-semicolon">;</div>
  </div>
</css-dec>


<css-block>
  <div class="css-declaration-block">

    <div class="css-line">
      <div class="css-editor-selector animated infinite flash-background" onclick="showSelector(this)">
        <div>{selector}</div>
      </div>
      <div class="css-editor-space"></div>
      <div class="css-editor-curly-bracket">
        <div>{</div>
      </div>
    </div>

    <div each="{ property, value in opts.attributes }" class="css-line">
      <css-dec></css-dec>
    </div>

    <!--div each={opts.children} class="css-line">
      <css-block each="{ selector, block in children }"
                 selector="{selector}"
                 children="{block.children}"
                 attributes="{block.attributes}">
      </css-block>
    </div-->

    <!--div class="css-line" onclick="addCSSLine(this)">
      <span>}</span>
    </div-->
  </div>
</css-block>


<css-editor>
  <css-block each="{ selector, block in opts.css.children }"
             selector="{selector}"
             children="{block.children}"
             attributes="{block.attributes}">
  </css-block>

  <script>
    console.log('css editor')
    console.log(CSSJSON.toCSS(opts.css))
  </script>
</css-editor>