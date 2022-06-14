export default class InfinitySlider {
  constructor(element) {
    this.root = element;
    this.wrapper = this.root.querySelector(`.slider__wrapper`);
    this.list = this.root.querySelector(`.slider__list`);
    this.slides = Array.from(this.root.querySelectorAll(`.slider__item`));
    this.leftButton = this.root.querySelector(`.slider__button--prev`);
    this.rightButton = this.root.querySelector(`.slider__button--next`);

    this._slideWidth = this.slides[0].offsetWidth;
    this._wrapperWidth = this.wrapper.offsetWidth;
    this._wrapperPadding = parseInt(window.getComputedStyle(this.wrapper, null).getPropertyValue(`padding-left`));
    
    this._SLIDER_WIDTH = this._wrapperWidth - this._wrapperPadding;
    this._SLIDES_NUMBER = this._SLIDER_WIDTH / this._slideWidth;

    this._shift = 0;
    this._left = 0;
    this._slideIndex = 0;
  }

  init() {
    this._setRightButtonClickHandler();
    this._setLeftButtonClickHandler();
  }

  _setLeftButtonClickHandler() { // ok
    this.leftButton.addEventListener(`click`, () => {
      (this._slideIndex > this._SLIDES_NUMBER) ? this._slideIndex -= this._SLIDES_NUMBER : ``;
      
      if (this._slideIndex <= this._SLIDES_NUMBER) {
        this._addSlidesToTheBegining();
        this._left -= this._SLIDER_WIDTH;
        
        this.list.style.left = this._left + `px`; 
      }

      this._shift += this._SLIDER_WIDTH; 
      this.list.style.transform = `translateX(${this._shift}px)`;

      console.log(this._slideIndex);
    });
  }

  _setRightButtonClickHandler() { // ok
    this.rightButton.addEventListener(`click`, () => {
      (this._slideIndex < this.slides.length) ? this._slideIndex += this._SLIDES_NUMBER : ``;
      
      if (this._slideIndex >= this.slides.length) {
        this._addSlidesToTheEnd();
        this._left += this._SLIDER_WIDTH;

        this.list.style.left = this._left + `px`;
      } 
        
      this._shift -= this._SLIDER_WIDTH;
      this.list.style.transform = `translateX(${this._shift}px)`;

      console.log(this._slideIndex);
    });
  }

  _addSlidesToTheEnd() { // ok
    const firstSlides = this.slides.splice(0, this._SLIDES_NUMBER);
    this.slides = [].concat(this.slides, firstSlides);
    
    firstSlides.forEach((slide) => this.list.insertAdjacentElement(`beforeend`, slide));
  }

  _addSlidesToTheBegining() { // ok
    const lastSlides = this.slides.splice(this.slides.length - this._SLIDES_NUMBER, this._SLIDES_NUMBER);
    this.slides = [].concat(lastSlides, this.slides);

    lastSlides.reverse().forEach((slide) => this.list.insertAdjacentElement(`afterbegin`, slide));
  }
}


