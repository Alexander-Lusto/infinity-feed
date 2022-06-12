export default class InfinitySlider {
  constructor(element) {
    this.root = element;
    this.wrapper = this.root.querySelector(`.slider__wrapper`);
    this.list = this.root.querySelector(`.slider__list`);
    this.slides = Array.from(this.root.querySelectorAll(`.slider__item`));
    this.leftButton = this.root.querySelector(`.slider__button--prev`);
    this.rightButton = this.root.querySelector(`.slider__button--next`);

    this._shift = 0;
    this._left = 0;
  }

  init() {
    this._setRightButtonClickHandler();
    this._setLeftButtonClickHandler();
  }

  _setLeftButtonClickHandler() {
    this.leftButton.addEventListener(`click`, () => {
      this._addSlidesToTheBegining();

      this._left += -1180;
      this._shift += 1180;

      this.list.style.left = this._left + `px`;  
      this.list.style.transform = `translateX(${this._shift}px)`; 
    });
  }

  _setRightButtonClickHandler() {
    this.rightButton.addEventListener(`click`, () => {
      this._addSlidesToTheEnd();

      this._left += 1180;
      this._shift += -1180;

      this.list.style.left = this._left + `px`;  
      this.list.style.transform = `translateX(${this._shift}px)`;
    });
  }

  _addSlidesToTheEnd() {
    const firstSlides = this.slides.splice(0, 5);
    this.slides = [].concat(this.slides, firstSlides);
    
    firstSlides.forEach((slide) => this.list.insertAdjacentElement(`beforeend`, slide));
  }

  _addSlidesToTheBegining() {
    const lastSlides = this.slides.splice(this.slides.length - 5, 5);
    this.slides = [].concat(lastSlides, this.slides);

    lastSlides.forEach((slide) => this.list.insertAdjacentElement(`afterbegin`, slide));
    console.log(this.list.querySelectorAll(`.slider__item`).length);
  }
}


