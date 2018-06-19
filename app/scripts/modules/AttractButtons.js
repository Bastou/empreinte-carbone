export default class AttractButton {
    constructor(el) {
        this.el = el;
        this.hover = false;
        this.currentPos = {x:0, y:0};
        this.distPos = {x:0, y:0};
        this.startPos = {x:0, y:0};
        this.animIterationCount = 0;
        this.animTotalIterations = (60 * 0.3); // 1 seconds

        this.domText = this.getButtonTextEl();

        this.calculatePosition();
        this.attachEventsListener();
        this.animate();
    }

    attachEventsListener() {
        window.addEventListener('mousemove', e => this.onMouseMove(e));
        window.addEventListener('resize', e => this.calculatePosition(e));
    }

    getButtonTextEl() {
        if(this.el.firstChild.tagName == "A") {
            return this.el.firstChild;
        } else {
            console.error("button link not as first child");
        }

    }

    calculatePosition() {
        this.el.style.transform = "translate(0,0)";
        const box = this.el.getBoundingClientRect();
        this.x = box.left + (box.width * 0.5);
        this.y = box.top + (box.height * 0.5) - box.height*2;
        this.width = box.width;
        this.height = box.height;
        console.log(this.width);
    }

    onMouseMove(e) {
        let hover = false;
        let hoverArea = (this.hover ? 0.5: 0.4);
        let x = e.clientX - this.x;
        let y = e.clientY - this.y;
        let distance = Math.sqrt( x*x + y*y );
        if (distance < (this.width * hoverArea)) {
            hover = true;
            if (!this.hover) {
                this.hover = true;
            }
            this.onHover(e.clientX, e.clientY);
        }

        if(!hover && this.hover) {
            this.onLeave();
            this.hover = false;
        }
    }

    onHover(x, y) {
        // reset anim
        this.animIterationCount = 0;
        this.distPos.x = (x - this.x);
        this.distPos.y = (y - this.y);

        this.el.style.zIndex = 10;
    }
    onLeave() {
        // reset anim
        this.animIterationCount = 0;
        this.distPos.x = this.distPos.y = 0;
        this.el.style.zIndex = 1;
    }
    animate() {
        this.currentPos.x += (this.distPos.x - this.currentPos.x) * 0.03;
        this.currentPos.y += (this.distPos.y - this.currentPos.y) * 0.03;

       // Set transform
       this.el.style.transform = 'translate3D(' + this.currentPos.x + 'px,' + this.currentPos.y + 'px, 0)';
       this.domText.style.transform = 'translate3D(' + this.currentPos.x * 0.115 + 'px,' + this.currentPos.y * 0.115 + 'px, 0)';

       requestAnimationFrame(this.animate.bind(this));
    }
}