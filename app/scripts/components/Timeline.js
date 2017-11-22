export default class Timeline {

    constructor() {
        this.update();
    }

    update() {
        var elem = document.querySelector('.timeline__range[type="range"]');

        var rangeValue = function(){
            var newValue = elem.value;
            var target = document.querySelector('.timeline__value');
            target.innerHTML = newValue;
            appConfig.height = newValue;
            console.log(appConfig);
        }

        elem.addEventListener("input", rangeValue);
    }

};
