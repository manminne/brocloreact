import React from 'react';
import logo from './logo.svg';
import './App.css';

setTimeout(function(){
    let TxtType:any = function(this: any, el:any, toRotate:any, period:any) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = '';
        this.tick();
        this.isDeleting = false;
    };


    TxtType.prototype.tick = function() {
        var i = this.loopNum % this.toRotate.length;
        var fullTxt = this.toRotate[i];

        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

        var that = this;
        var delta = 200 - Math.random() * 100;

        if (this.isDeleting) { delta /= 2; }

        if (!this.isDeleting && this.txt === fullTxt) {
            delta = this.period;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.loopNum++;
            delta = 500;
        }

        setTimeout(function() {
            that.tick();
        }, delta);
    };


    function collectData() {
        var elements = document.getElementsByClassName('typewrite');
        for (var i=0; i<elements.length; i++) {
            var toRotate = elements[i].getAttribute('data-type');
            var period = elements[i].getAttribute('data-period');
            if (toRotate) {
                new TxtType(elements[i], JSON.parse(toRotate), period);
            }
        }

    };
    collectData()
}, 3000);



//setTimeout(function(){ document.getElementById("broclohead").style.border = "none" }, 1300);


function App() {
  return (
      <div id="typing-div">
        <div id="container">
          <div className="typewriter">
            <h1 className="animate__animated animate__fadeInDown animate__delay-1s" id="broclohead">BroClo</h1>
          </div>
          <div>
            <h2 id="heading-id">
              <a href="" className="typewrite" data-period="2000"
                 data-type='[ "drippiest fashion brand", "first drop in spring 2021", "Collection: After Party" ]'>
                <span className="wrap"></span>
              </a>
            </h2>
          </div>
        </div>

      </div>



  );
}

export default App;
