import {Map, List, toJS} from 'immutable'
import {UPDATE_PROPERTY, UPDATE_PROPERTY_NAME, DELETE_PROPERTY, updatePropertyName, updatePropertyValue, deleteProperty } from "./actions"
import * as css from 'css'


riot.tag2('css-property', '<div if="{!edit}" onclick="{toEditMode}">{opts.property}</div> <div if="{edit}"> <input class="css-editor-input" name="input" onblur="{toUnEditMode}" onchange="{toUnEditMode}" onkeypress="{keyPress}"> </div>', '', '', function(opts) {
    this.toEditMode = function()
    {
      this.edit = true
      this.input.value = opts.property
    }.bind(this)

    this.toUnEditMode = function()
    {
      this.opts.store.dispatch(updatePropertyName(this.opts.path, this.input.value))
      this.edit = false
    }.bind(this)

    this.keyPress = function(event)
    {
      if (event.charCode === 13) {
        this.toUnEditMode()
      }
      else {

        return true
      }
    }.bind(this)

    this.on('updated', function(){
      if(this.edit){
        if(this.awesome === undefined ){
          var awesomParams =  {list: opts.list, minChars: 0}
          this.awesome = new Awesomplete(this.input, awesomParams);
          this.awesome.evaluate();
          this.input.addEventListener("awesomplete-selectcomplete", this.toUnEditMode);
        }
        this.input.focus()
      }
    })
});


riot.tag2('css-value', '<div if="{!edit}" onclick="{toEditMode}">{opts.value}</div> <div if="{edit}"> <input class="css-editor-input" name="input" onblur="{toUnEditMode}" onchange="{toUnEditMode}" onkeypress="{keyPress}"> </div>', '', '', function(opts) {
    function colorElement(text, input) {
      var split = text.split(",");
      var colorHex = split[0]
      var colorName = split[split.length - 1];
      var element = document.createElement("li");
      element.innerHTML = colorHex + " " + colorName;
      element.style.backgroundColor = colorHex;
      return element;
    };

    this.toEditMode = function()
    {
      this.edit = true
      this.input.value = opts.value
    }.bind(this)

    this.toUnEditMode = function()
    {
      this.opts.store.dispatch(updatePropertyValue(this.opts.path, this.input.value))
      this.edit = false
    }.bind(this)

    this.keyPress = function(event)
    {
      if (event.charCode === 13) {
        this.toUnEditMode()
      }
      else {

        return true
      }
    }.bind(this)

    this.on('updated', function(){
      if(this.edit){
        if(this.awesome === undefined ){
          var awesomParams =  {list: opts.list, minChars: 0,  item: colorElement}
          this.awesome = new Awesomplete(this.input, awesomParams);
          this.awesome.evaluate();
          this.input.addEventListener("awesomplete-selectcomplete", this.toUnEditMode);
        }
        this.input.focus()
      }
    })

});


riot.tag2('css-declaration', '<div name="line" class="css-line css-editor-declaration"> <div class="css-editor-indent"></div> <css-property class="css-editor-property" property="{opts.obj.property}" list="{opts.property_list}" store="{opts.store}" path="{opts.path.push(⁗property⁗)}"></css-property> <div class="css-editor-colon">:</div> <css-value class="css-editor-value" value="{opts.obj.value}" list="{opts.value_list}" store="{opts.store}" path="{opts.path.push(⁗value⁗)}"></css-value> <div class="css-editor-semicolon"><span>;</span></div> <button class="css-delete-button" onclick="{deleteLine}">x</button> </div>', '', '', function(opts) {

    var self = this;

    this.deleteLine = function(){
      self.line.className += " css-animated css-delete";

      setTimeout(function(){
        self.opts.store.dispatch(deleteProperty(self.opts.path))
      }, 200);
    }

});


riot.tag2('css-rule', '<div class="css-declaration-block"> <div class="css-line"> <div class="css-editor-selector animated infinite flash-background" onclick="showSelector(this)"> <span>{opts.obj.selectors}</span> </div> <div class="css-editor-space"></div> <div class="css-editor-curly-bracket"> <span>&#123</span> </div> </div> <css-declaration each="{obj, index in opts.obj.declarations}" path="{parent.opts.path.push(⁗declarations⁗).push(index)}" obj="{obj}" store="{parent.opts.store}" property_list="{parent.opts.property_list}" value_list="{parent.opts.value_list}"> </css-declaration> <div class="css-line"> <div>&#125</div> </div> </div>', '', '', function(opts) {
});


riot.tag2('css-media', '<div class="css-declaration-block"> <div class="css-line"> <div class="css-editor-selector animated infinite flash-background"> <span>&#64media {opts.obj.media}</span> </div> <div class="css-editor-space"></div> <div class="css-editor-curly-bracket"> <span>&#123</span> </div> </div> <css-rule each="{obj, index in opts.obj.rules}" path="{parent.opts.path.push(⁗rules⁗).push(index)}" obj="{obj}" store="{parent.opts.store}" property_list="{parent.opts.property_list}" value_list="{parent.opts.value_list}"> </css-rule> <div class="css-line"> <div>&#125</div> </div> </div>', '', '', function(opts) {
    console.log("I'm called")
});


riot.tag2('css-keyframe', '<div class="css-declaration-block"> <div class="css-line"> <div class="css-editor-selector animated infinite flash-background" onclick="showSelector(this)"> <span>{opts.obj.values}</span> </div> <div class="css-editor-space"></div> <div class="css-editor-curly-bracket"> <span>&#123</span> </div> </div> <css-declaration each="{obj, index in opts.obj.declarations}" path="{parent.opts.path.push(⁗declarations⁗).push(index)}" obj="{obj}" store="{parent.opts.store}" property_list="{parent.opts.property_list}" value_list="{parent.opts.value_list}"> </css-declaration> <div class="css-line"> <div>&#125</div> </div> </div>', '', '', function(opts) {
});


riot.tag2('css-keyframes', '<div class="css-declaration-block"> <div class="css-line"> <div class="css-editor-selector animated infinite flash-background"> <span>&#64{opts.obj.vendor}keyframes {opts.obj.name}</span> </div> <div class="css-editor-space"></div> <div class="css-editor-curly-bracket"> <span>&#123</span> </div> </div> <css-keyframe each="{obj, index in opts.obj.keyframes}" path="{parent.opts.path.push(⁗keyframes⁗).push(index)}" obj="{obj}" store="{parent.opts.store}" property_list="{parent.opts.property_list}" value_list="{parent.opts.value_list}"> </css-keyframe> <div class="css-line"> <div>&#125</div> </div> </div>', '', '', function(opts) {
});

riot.tag2('css-block', '<css-rule if="{opts.obj.type==⁗rule⁗}" path="{opts.path}" obj="{opts.obj}" store="{opts.store}" property_list="{opts.property_list}" value_list="{opts.value_list}"></css-rule> <css-keyframes if="{opts.obj.type==⁗keyframes⁗}" path="{opts.path}" obj="{opts.obj}" store="{opts.store}" property_list="{opts.property_list}" value_list="{opts.value_list}"></css-keyframes> <css-media if="{opts.obj.type==⁗media⁗}" path="{opts.path}" obj="{opts.obj}" store="{opts.store}" property_list="{opts.property_list}" value_list="{opts.value_list}"></css-media>', '', '', function(opts) {
});


riot.tag2('css-editor', '<css-block each="{obj, i in this.css.rules}" path="{parent.opts.path.push(⁗rules⁗).push( i )}" obj="{obj}" store="{parent.opts.store}" property_list="{parent.opts.property_list}" value_list="{parent.opts.value_list}"> </css-block>', '', '', function(opts) {
    this.css = this.opts.store.getState().toJS();

    this.opts.path = List.of()

    var self = this;
    this.opts.store.subscribe(function() {
      self.css = self.opts.store.getState().toJS();
      self.update();
    })
});