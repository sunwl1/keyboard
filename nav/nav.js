var Nav = (
  function ($) {
    function Nav($container) {
      this.init($container);
    }
     
    Nav.prototype.init = function ($container) {
      if ($container === '' || $container === null) { return }
      
      if (typeof $container === 'string') {
        this.container = $($container);
      } else if (typeof $container === 'object') {
        this.container = $container;
      } else {
        return;
      }
      this.$title = [
        "데이터 관리 및 충전/살균 기능을 이용하시려면 화살표를 눌러주세요",
        "이용하실 보관함을 선택해 주세요",
      ];
      this.$slot = [];
      this.$slotText = ["충전/살균 전용","데이터 전용"];
      this.$useText = ["사용가능","사용중","사용완료"];
      this.$slotCount = 4;
      var title = document.createElement('h3');
      var slotContent = document.createElement('section');
      var icon = document.createElement('i');

      $(title).addClass('nav-title');
      $(title).html(this.$title[1]);
      $(slotContent).addClass('slot-content');
      $(icon).addClass('nav-icon');
      $(icon).click(function(){
        $($container).toggleClass('is-active');
        if($($container).hasClass('is-active'))
        {

        }
      });
      for (let i = 0; i < this.$slotCount; i++) {
        var slot = document.createElement('div');
        var num = document.createElement('h3');
        var text = document.createElement('p');
        var used = document.createElement('h2');
        num.innerHTML = i + 1;
        text.innerHTML = this.$slotText[0];
        used.innerHTML = this.$useText[0];
        $(num).addClass('slot-num');
        $(text).addClass('slot-text');
        $(used).addClass('slot-used');
        $(slot).addClass('slot-' + (i + 1));
        slot.appendChild(num);
        slot.appendChild(text);
        slot.appendChild(used);
        this.$slot.push(slot);
        slotContent.appendChild(slot);
      }
      if(this.container.appendChild === undefined)
      {
        this.container.get(0).appendChild(icon);
        this.container.get(0).appendChild(title);
        this.container.get(0).appendChild(slotContent);
      }
      else{
        this.container.appendChild(icon);
        this.container.appendChild(title);
        this.container.appendChild(slotContent);
      }
    };

    Nav.prototype.usedSlot = function(index){
      if($(this.$slot).eq(index).hasClass('is-active'))
      {
        return;
      }
      else{
        $(this.$slot).eq(index).addClass('is-active');
      }
      var content = this.$slot[index].children;
      $(content[1]).html(this.$slotText[1]);
      $(content[2]).html(this.$useText[1]);
    };

    Nav.prototype.useCompleteSlot = function(index){
      if($(this.$slot).eq(index).hasClass('is-active'))
      {
        return;
      }
      else{
        $(this.$slot).eq(index).addClass('is-active');
      }
      var content = this.$slot[index].children;
      $(content[1]).html(this.$slotText[1]);
      $(content[2]).html(this.$useText[2]);
    };

    Nav.prototype.availableSlot = function(index){
      if($(this.$slot).eq(index).hasClass('is-active'))
      {
        $(this.$slot).eq(index).removeClass('is-active');
      }
      else{
        return;
      }
      var content = this.$slot[index].children;
      $(content[1]).html(this.$slotText[0]);
      $(content[2]).html(this.$useText[0]);
    };

    return Nav;
  }(jQuery));