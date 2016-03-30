<css-space>
  <div class="css-space"></div>
</css-space>

<css-indent>
  <div class="css-indent"></div>
</css-indent>

<css-curly-bracket>
  <div>{ opts.right_or_left_bracket }</div>
</css-curly-bracket>

<css-property>

  <div if={!opts.edit} onclick={toEditMode}>{opts.property}</div>

  <input if={opts.edit}
         name="input"
         onBlur={toUnEditMode}
         onChange={toUnEditMode}
         onKeyPress={keyPress}>

  <button if={opts.edit}>x</button>

  <script>
    toEditMode(event){
      opts.edit = true
      this.input.value = opts.property
    }

    toUnEditMode(event){
      opts.property = this.input.value
    }

    keyPress(event){
      if(event.charCode === 13) {
        opts.property = this.input.value
        opts.edit = false
      }
      else{
        //http://riotjs.com/guide/#event-handlers
        //returning true calls the default onKeyPress handler
        return true
      }
    }
  </script>
</css-property>

<css-value>
  <div if={!opts.edit}>{opts.value}</div>
  <input if={opts.edit}>
</css-value>

<css-decalaration>
  <css-property></css-property>
  <css-value></css-value>
</css-decalaration>


<css-selector>
</css-selector>


<css-line>

  <!-- Polymorphism: CSS line is either of them below -->
  <css-selector opts=></css-selector>
  <script>
    console.log(opts.plan);
  </script>
</css-line>


<css-editor>
  <div each={ items }>Hello</div>

  <script>
    this.items = [
      { title: 'First item', done: true },
      { title: 'Second item' },
      { title: 'Third item' }
    ]
  </script>
</css-editor>