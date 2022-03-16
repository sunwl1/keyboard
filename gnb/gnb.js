var Gnb = (
  function ($) {
    function Gnb($container) {
      this.init($container);
    }
     
    Gnb.prototype.init = function ($container) {
      if ($container === '' || $container === null) { return }
      
      if (typeof $container === 'string') {
        this.container = $($container);
      } else if (typeof $container === 'object') {
        this.container = $container;
      } else {
        return;
      }
      this.$step = ["판매 준비","ATM 연결<br>및 수납","중고폰 현장<br>진단","최종금액 지급"];
      this.$title = [
        "<span>민팃 커넥터 앱을 설치</span>하고 꼭 실행해주세요",
        "<span>판매 준비가 완료</span>되었어요!",
        "꼭! <span>ATM 연결 후 앱을 실행한 채</span> 수납해주세요",
        "<span>ATM에 정상 수납</span>되었어요!",
        "<span>중고폰 진단 중이에요!</span> 조금만 기다려주세요",
        "<span>중고폰 진단이 완료</span>되었어요!",
        "마지막이에요! 중고폰 <span>판매금을 드릴게요</span>",
        "<span>판매가 완료</span>되었어요! 민팃해주셔서 감사해요!"
      ];
      var headerProgress;
      var textArr = this.$step
      var titleArr = this.$title;
      if(textArr === undefined) return;
      $(this.container).append('<h3 class="progress-tit">' + titleArr[0] + '</h3>');
      headerProgress = $('<ul class="progress-content"></ul>');
      textArr.forEach(function(el,index){
        headerProgress.append('<li></li>');
        headerProgress.append('<li><img/><span>' + el + '</span></li>');
      })
      headerProgress.append('<li class="progress-end"></li>');
      $(this.container).append(headerProgress);
      $(this.container).append('<img class="arrow-content" src="gnb/img/arrow.png"></img>');
      $(this.container).append('<img class="progress-character" src="gnb/img/progress-01.png"></img>');
    }

    Gnb.prototype.setProgress = function(index) {
      var titleArr = this.$title;
      var tit = $(this.container).find('.progress-tit');
      var li = $(this.container).find('.progress-content li');
      var character = $(this.container).find('.progress-character');

      tit.html(titleArr[index]);
      li.removeClass('is-active');

      if((index + 1) < li.length )
      character.css('left',((index + 1) * li.eq(0).width() - (character.width() / 2)) + 'px');
      switch (index) {
        case 0 : case 1 : case 2: case 3 :
          character.attr('src',"gnb/img/progress-01.png");
          break;
        case 4 : case 5: case 6:
          character.attr('src',"gnb/img/progress-02.png");
          break;
        case 7:
          character.attr('src',"gnb/img/progress-02.png");
          break;
        default:
          break;
      }
      var activeSetting = false;
      li.each(function(i,el){
        var img = $(el).find('img');
        if(img.length !== 0)
        {
          img.attr('src',"gnb/img/ic-normal.png");
          img.addClass("ic-normal");
          img.next().removeClass('is-ready');
          img.next().removeClass('is-check');
          if(activeSetting == false && index < i)
          {
            img.attr('src',"gnb/img/ic-progress-"+(i + 1) / 2 + ".png");
            img.removeClass("ic-normal");
            img.next().addClass('is-ready');
            activeSetting = true;
          }
          if(i<index && (li.length - 2 > i))
          {
            img.attr('src',"gnb/img/ic-check.png");
            img.removeClass("ic-normal");
            img.next().addClass('is-check');
          }
        }

        if(i<=index)
        {
          $(el).addClass('is-active');
        }
      });
    };

    return Gnb;
  }(jQuery));