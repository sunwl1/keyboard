var keyboard = (
  function ($) {
    function keyboard($container) {
      this.init($container);
      String.prototype.insertAt = function(index,str){
        return this.slice(0,index) + str + this.slice(index)
      }
    }
     
    keyboard.prototype.init = function ($container) {
      if ($container === '' || $container === null) { return }
      
      this.lower = ["1" , "2" , "3" , "4" , "5" , "6" , "7" , "8" , "9" , "0" , "-"  , "Back", "q" , "w" , "e" , "r" , "t" , "y" , "u" , "i" , "o" , "p" , "[" , "]" , "a" , "s" , "d" , "f" , "g" , "h" , "j" , "k" , "l" , ";" , "'" , "|" , "z" , "x" , "c" , "v" , "b" , "n" , "m" , "," , "." , "/"  , "Send", "Shift" , "`" , "="  , "Space" , "@" , ".com"];

      this.upper = [ "!" , "@" , "#" , "$" , "%" , "^" , "&" , "*" , "(" , ")" , "_" , "Back" ,
       "Q" , "W" , "E" , "R" , "T" , "Y" , "U" , "I" , "O" , "P" , "{" , "}", "A" , "S" , "D" , "F" , "G" , "H" , "J" , "K" , "L" , ":" , "'" , "&#8361", "Z" , "X" , "C" , "V" , "B" , "N" , "M" , "<" , ">" , "?" , "Send" , "Shift" , "~" , "+"  , "Space" , "@" ,".com"  ];

      this.input = "";
      this.case = "lower";
      
      if (typeof $container === 'string') {
        this.container = $($container);
      } else if (typeof $container === 'object') {
        this.container = $container;
      } else {
        return;
      }
      this.boardSetting(this.case);
    }

    keyboard.prototype.boardSetting = function($case){
      var content;
      var $this = this;
      var div = document.createElement('div');

      $(this.container).html("");
      content = $case === "upper" ? this.upper : this.lower;
      for (value in content) {
        var key = document.createElement('button');
        key.innerHTML = content[value];
        key.addEventListener('click',function(){$this.keyInput(this.innerHTML)});
        div.appendChild(key);
        $(key).addClass('key');
        $(this.container).addClass('keyboard');
        
        if(content[value] === "Back" || content[value] === "}" || content[value] === "]"
        || content[value] === "|" || content[value] === "&#8361"|| content[value] === "Send")
        {
          var div = document.createElement('div');
          if(content[value] === "Send")
          {
            $(key).addClass('send');
          }
        }
        if(content[value] === "Space")
        {
          $(key).addClass('space');
        }

        if(this.container.appendChild === undefined)
        {
          this.container.get(0).appendChild(div);
        }
        else{
          this.container.appendChild(div);
        }
      }
      this.case = this.case === "upper" ? "lower" :"upper";
    }

    keyboard.prototype.keyInput = function(value){
      switch (value) {
        case 'Back':
          this.$input.value = this.$input.value.slice(0, -1);
          break;
        case 'Send':
          this.send(this.$input.value);
          break;
        case 'Shift':
          this.boardSetting(this.case);
          break;
        case 'Space':
          this.$input.value += " ";
          break;
        default:
          var text = document.createElement("p");
          $(text).html(value);
          if(this.$insertIndex === this.$input.value.length || this.$insertIndex === undefined)
          {
            this.$input.value += $(text).text();
          }
          else{
            this.$input.value = this.$input.value.insertAt(this.$insertIndex,$(text).text());
          }
          break;
      }
    }

    keyboard.prototype.send = function(value){
      var reg = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
      if(reg.test(value))
      {
        alert(value + '정상적인 이메일 입니다!');
      }
      else{
        alert('이메일 형식을 확인해주세요!');
      }
    }

    keyboard.prototype.setInput = function($input){
      this.$input = $($input).get(0);
      var $this = this;
      $(this.$input).click(function(){
        if($(this).prop("selectionStart") !==0 )
        $this.$insertIndex = $(this).prop("selectionStart");
      });
    }

    return keyboard;
  }(jQuery));