var keyboard = (
  function ($) {
    $.fn.hasScrollBar = function() {
      return this.get(0).scrollHeight > this.innerHeight();
    }
    function keyboard($container) {
      this.init($container);
      String.prototype.insertAt = function(index,str){
        return this.slice(0,index) + str + this.slice(index)
      }
      String.prototype.removeAt = function(index){
        if(index >= 0)
        {
          return this.slice(0,index - 1) + this.slice(index);
        }
        else{
          return this.slice(0,index) + this.slice(index);
        }
      }
    }
     
    keyboard.prototype.init = function ($container) {
      if ($container === '' || $container === null) { return }
      
      this.lower = ["1" , "2" , "3" , "4" , "5" , "6" , "7" , "8" , "9" , "0" , "^"  , "Back",
       "q" , "w" , "e" , "r" , "t" , "y" , "u" , "i" , "o" , "p" , "[" , "]" ,
        "a" , "s" , "d" , "f" , "g" , "h" , "j" , "k" , "l" , ";" , "-" , "¥" ,
         "z" , "x" , "c" , "v" , "b" , "n" , "m" , "," , "." , "/"  , "Enter",
          "Shift" , "`" , "="  , "Space" , "@" , ".com"];

      this.upper = [ "!" , "“" , "#" , "$" , "%" , "&" , "‘" , "(" , ")" , "=" , "~" , "Back" ,
       "Q" , "W" , "E" , "R" , "T" , "Y" , "U" , "I" , "O" , "P" , "{" , "}",
        "A" , "S" , "D" , "F" , "G" , "H" , "J" , "K" , "L" , ":" , "_" , "|",
         "Z" , "X" , "C" , "V" , "B" , "N" , "M" , "<" , ">" , "?" , "Enter" ,
          "Shift" , "~" , "+"  , "Space" , "@" ,".com"  ];

      this.input = "";
      this.case = "lower";
      this.keyUp = true;
      
      if (typeof $container === 'string') {
        this.container = $($container);
      } else if (typeof $container === 'object') {
        this.container = $container;
      } else {
        return;
      }
      this.caseChenge(this.case);
    }

    keyboard.prototype.caseChenge = function($case){
      var content;
      var $this = this;
      var div = document.createElement('div');
      var keyDown;
      var timer;
      $(this.container).html("");
      content = $case === "upper" ? this.upper : this.lower;
      for (value in content) {
        var key = document.createElement('button');
        key.innerHTML = content[value];
        if(content[value] !== "Enter")
        {
          key.addEventListener('mousedown',function(){
            this.keyUp = false;
            var _$this = this;
            $this.keyInput(this.innerHTML)
            if(keyDown === undefined && timer === undefined)
            {
              timer = setTimeout(function (){
                if(_$this.keyUp === false)
                keyDown = setInterval(function (){
                  $this.keyInput(_$this.innerHTML);
                }, 50);
              }, 500);
            }
          });
        }
        else{
          key.addEventListener('mousedown',function(){
            $this.keyInput(this.innerHTML)
          });
        }

        window.addEventListener('mouseup',function(){
          clearInterval(keyDown);
          clearTimeout(timer);
          keyDown = undefined;
          timer = undefined;
          $this.keyUp = true;
          $($this.$input).prop("selectionStart",$this.$insertIndex);
          $($this.$input).prop("selectionEnd",$this.$insertIndex);
          $($this.$input).focus();
        });
        div.appendChild(key);
        $(key).addClass('key');
        $(this.container).addClass('keyboard');
        
        if(content[value] === "Back" || content[value] === "}" || content[value] === "]"
        || content[value] === "|" || content[value] === "¥"|| content[value] === "Enter")
        {
          var div = document.createElement('div');
          if(content[value] === "Enter")
          {
            $(key).addClass('enter');
          }
        }
        if(content[value] === "Space")
        {
          $(key).addClass('space');
        }
        if(content[value] === "Shift")
        {
          $(key).addClass('shift');
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
      var $this = this;
        switch (value) {
          case 'Back':
            if(this.$insertIndex === this.$input.value.length || this.$insertIndex === undefined)
            {
              this.$input.value = this.$input.value.slice(0, -1);
            }
            else{
              this.$input.value = this.$input.value.removeAt(this.$insertIndex);
              if(this.$insertIndex > 0)
              this.$insertIndex--;
            }
            break;
          case 'Enter':
            this.Enter(this.$input.value);
            break;
          case 'Shift':
            this.caseChenge(this.case);
            break;
          case 'Space':
            if(this.maxValCheck())
            if(this.$insertIndex === this.$input.value.length || this.$insertIndex === undefined)
            {
              this.$input.value += " ";
            }
            else{
              this.$input.value = this.$input.value.insertAt(this.$insertIndex," ");
              this.$insertIndex++;
            }
            break;
          case '.com':
            var text = document.createElement("p");
            $(text).html(value);
            if(this.maxValCheck())
            {
              if(this.$insertIndex === undefined)
              {
                this.$input.value += $(text).text();
              }
              else{
                this.$input.value = this.$input.value.insertAt(this.$insertIndex,$(text).text());
                this.$insertIndex+=4;
              }
              this.maxValCheck()
            }
            break;
          default:
            var text = document.createElement("p");
            $(text).html(value);
            if(this.maxValCheck())
            if(this.$insertIndex === undefined)
            {
              this.$input.value += $(text).text();
            }
            else{
              this.$input.value = this.$input.value.insertAt(this.$insertIndex,$(text).text());
              this.$insertIndex++;
            }
            break;
        }
        if($($this.$input).hasScrollBar()){
          if(!$($this.$input).hasClass('case2')){
            $($this.$input).addClass('case2');
          }
        }
        else{
          if($($this.$input).hasClass('case2')){
            $($this.$input).removeClass('case2');
          }
        }
        $(this.$input).prop("selectionStart",this.$insertIndex);
        $(this.$input).prop("selectionEnd",this.$insertIndex);
        $(this.$input).focus();
    }

    keyboard.prototype.Enter = function(value){
      var reg = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
      if(reg.test(value))
      {
        alert(value + '정상적인 이메일 입니다!');
      }
      else{
        alert('이메일 형식을 확인해주세요!');
      }
    }

    keyboard.prototype.maxValCheck = function(){
      if($(this.$input).val().length >= 64) {
        $(this.$input).val($(this.$input).val().substring(0, 64));
        return false;
      }
      else{
        return true;
      }
    }

    keyboard.prototype.setInput = function($input){
      this.$input = $($input).get(0);
      var $this = this;
      this.$input.addEventListener('mouseup',function(){
        if($(this).prop("selectionStart") !==0 )
        $this.$insertIndex = $(this).prop("selectionStart");
      });
    }

    return keyboard;
  }(jQuery));