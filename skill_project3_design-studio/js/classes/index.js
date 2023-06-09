class Slider {
    
    nodes = {
        sliderNode: null,
        sliderItemsNode: null,
        sliderItemNodes: [],
        sliderArrowLeftNode: null,
        sliderArrowRightNode: null
    };
    
    cssSelectors = {
        items: '.slider__items',
        item: '.slider__item',
        wrapper: '.slider__wrapper',
        arrowLeft: '.slider__arrow_left',
        arrowRight: '.slider__arrow_right'
    };
    
    moveSlideShiftX = 0;
    shiftX = 0;
    lastShifX = 0;
    objShiftX = {};
    
    startMovePos = {
        x: 0,
        y: 0
    };
    
    activeItemIndex = 0;
    
    isDragging = false;
    countDragging = 0;
    
    teamsTitleNode = document.querySelector('.teams__title');
    
    
    constructor(sliderSelector) {
        this.initNodes(sliderSelector);
        this.initEventListeners();
        this.setObjShiftX();
        this.addTransition();
        this.setShiftX();
    }
    
    initNodes(sliderSelector) {
        this.nodes.sliderNode = document.querySelector(sliderSelector);
        if (this.nodes.sliderNode === null) {
            throw new Error(`Slider: по селектору ${sliderSelector} не найден элемент в DOM дереве`);
        }
        
        this.nodes.sliderItemsNode = this.nodes.sliderNode.querySelector(this.cssSelectors.items);
        if (this.nodes.sliderItemsNode === null) {
            throw new Error(`Slider: по селектору ${this.cssSelectors.items} не найден элемент в DOM дереве`);
        }
        
        this.nodes.sliderItemNodes = Array.from(this.nodes.sliderNode.querySelectorAll(this.cssSelectors.item));
        if (this.nodes.sliderItemNodes.length === 0) {
            throw new Error(`Slider: по селектору ${this.cssSelectors.item} не найдены элементы слайдера в DOM дереве`);
        }
        
        this.nodes.sliderArrowLeftNode = this.nodes.sliderNode.querySelector(this.cssSelectors.arrowLeft);
        if (this.nodes.sliderArrowLeftNode === null) {
            throw new Error(`Slider: по селектору ${this.cssSelectors.arrowLeft} не найден элемент в DOM дереве`);
        }
        
        this.nodes.sliderArrowRightNode = this.nodes.sliderNode.querySelector(this.cssSelectors.arrowRight);
        if (this.nodes.sliderArrowLeftNode === null) {
            throw new Error(`Slider: по селектору ${this.cssSelectors.arrowRight} не найден элемент в DOM дереве`);
        }
        
    }
    
    initEventListeners() {
        window.addEventListener('resize', this.debounce(this.resizeEvent, 50));
        
        this.nodes.sliderArrowLeftNode.addEventListener('click', () => {
            const nextIndex = this.getNextIndex(-1);
            this.changeSlide(nextIndex);
        });
        
        this.nodes.sliderArrowRightNode.addEventListener('click', () => {
            const nextIndex = this.getNextIndex(1);
            this.changeSlide(nextIndex);
        });
        
        for (const sliderNode of this.nodes.sliderItemNodes) {
            sliderNode.addEventListener('pointerdown', this.dragStart);
        }
        
        document.addEventListener('pointermove', this.dragging);
        document.addEventListener('pointerout', (event) => {
            if (event.relatedTarget === null) {
                console.log("Курсор мыши ушёл из браузера");
                this.dragStop(event);
            }
        });
        
        document.addEventListener('pointerup', this.dragStop);
        document.addEventListener('pointerleave', this.dragStop);
    }
    
    resizeEvent = () => {
        this.setObjShiftX();
        this.removeTransition();
        this.setShiftX();
        this.addTransition();
    }
    
    dragStart = (e) => {
        const x = e.clientX;
        const y = e.clientY;
        if (e.button === 2 || e.button === 1) return false; // Если это правая или средняя кнопка мыши, это не тот клик
        this.isDragging = true;
        this.startMovePos = {
            x: x,
            y: y
        };
        this.lastShifX = this.shiftX;
        this.removeTransition();
        console.log('dragStart');
    }
    
    dragStop = (e) => {
        this.isDragging = false;
        
        this.addTransition();
        if (this.moveSlideShiftX !== 0) this.autoSlide();
        
        this.moveSlideShiftX = 0;
        console.log('dragStop');
    }
    
    dragging = (e) => {
        const x = e.clientX;
        const y = e.clientY;
        
        if (this.isDragging === false) return;
        
        const nextMovePos = {
            x: x,
            y: y
        };
        const diffMovePos = {
            x: nextMovePos.x - this.startMovePos.x,
            y: nextMovePos.y - this.startMovePos.y
        }
        
        this.moveSlideShiftX = diffMovePos.x;
        this.calcMoveSlideShiftX();
        this.countDragging++;
        this.teamsTitleNode.innerText = `${this.countDragging} dragging`;
        
        console.log('dragging');
    }
    
    autoSlide() {
        const dir = this.moveSlideShiftX < 0 ? 'left' : 'right';
        
        let nextIndex = this.activeItemIndex + (dir === 'left' ? 1 : -1);
        let remainingShiftX = Math.abs(this.moveSlideShiftX);
        const loopBool = dir === 'left' ? nextIndex < this.nodes.sliderItemNodes.length : nextIndex >= 0;
        
        for (let step = 0; loopBool; step++) {
            const lastIndex = nextIndex + (dir === 'left' ? -1 : 1);
            const currentShiftX = step === 0 ? this.lastShifX : this.objShiftX[lastIndex];
            const nextShiftX = this.objShiftX[nextIndex];
            const distanceBetweenSlides = Math.abs(currentShiftX - nextShiftX);
            const percentMoved = remainingShiftX / distanceBetweenSlides;
            
            if (percentMoved >= 0.5 && percentMoved <= 1) {
                this.activeItemIndex = nextIndex;
                break;
            } else if (percentMoved < 0.5 && step === 0) {
                break;
            } else if (percentMoved < 0.5 && step !== 0) {
                this.activeItemIndex = lastIndex;
                break;
            } else if (percentMoved > 1) {
                const isLastSlide = dir === 'left' ? nextIndex + 1 >= this.nodes.sliderItemNodes.length : nextIndex - 1 < 0;
                
                if (isLastSlide) {
                    this.activeItemIndex = nextIndex;
                    break;
                } else {
                    nextIndex += dir === 'left' ? 1 : -1;
                    remainingShiftX -= distanceBetweenSlides;
                    continue;
                }
            }
        }
        this.setShiftX(this.activeItemIndex);
    }
    
    addTransition() {
        const noParseTransitionDuration = parseFloat(getComputedStyle(this.nodes.sliderItemsNode).getPropertyValue('--transitionDurationSeconds'));
        const transitionDuration = isNaN(noParseTransitionDuration) ? 0.3 : noParseTransitionDuration;
        this.nodes.sliderItemsNode.style.transitionDuration = `${transitionDuration}s`;
    }
    
    removeTransition() {
        this.nodes.sliderItemsNode.style.transitionDuration = '0s';
    }
    
    setObjShiftX() {
        this.objShiftX = {};
        for (let i = 0; i < this.nodes.sliderItemNodes.length; i++) {
            this.objShiftX[i] = this.getShiftX(i);
        }
        console.log(this.objShiftX);
    }
    
    getNextIndex(dir) {
        const quantityItems = this.nodes.sliderItemNodes.length;
        return (this.activeItemIndex + dir + quantityItems) % quantityItems;
    }
    
    getCenteringShiftX = (activeItemIndex = this.activeItemIndex) => {
        const firstSliderItemNode = this.nodes.sliderItemNodes[activeItemIndex];
        const sliderItemsNode = this.nodes.sliderItemsNode;
        
        const widthSlider = sliderItemsNode.offsetWidth;
        const widthFirstSliderItem = firstSliderItemNode.offsetWidth;
        
        const centeringShiftX = Math.max((widthSlider - widthFirstSliderItem) / 2, 0);
        // this.centeringShiftX = Math.max((widthSlider - widthFirstSliderItem) / 2, 0);
        return centeringShiftX;
    }
    
    getChangeSlideShiftX(activeItemIndex = this.activeItemIndex) {
        const firstRect = this.nodes.sliderItemNodes[0].getBoundingClientRect();
        const nextRect = this.nodes.sliderItemNodes[activeItemIndex].getBoundingClientRect();
        const diffLeftNextSlide = nextRect.left - firstRect.left;
        
        return diffLeftNextSlide;
        // this.changeSlideShiftX = diffLeftNextSlide;
    }
    
    getShiftX(activeItemIndex = this.activeItemIndex) {
        return this.getCenteringShiftX(activeItemIndex) - this.getChangeSlideShiftX(activeItemIndex);
    }
    
    setShiftX = (activeItemIndex = this.activeItemIndex) => {
        this.shiftX = this.objShiftX[activeItemIndex];
        this.nodes.sliderItemsNode.style.transform = `translateX(${this.shiftX}px)`;
    }
    
    calcMoveSlideShiftX() {
        this.shiftX = this.lastShifX + this.moveSlideShiftX;
        
        this.nodes.sliderItemsNode.style.transform = `translateX(${this.shiftX}px)`;
    }
    
    changeSlide(nextIndex) {
        this.activeItemIndex = nextIndex;
        this.setShiftX();
    }
    
    debounce(func, delay) {
        let timeoutId;
        return function(...args) {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            timeoutId = setTimeout(() => {
                func.apply(this, args);
            }, delay);
        };
    }
    
}

const slider = new Slider('.teams__slider');
