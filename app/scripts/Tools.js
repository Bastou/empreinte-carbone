// Tools
export default class Tools {

	constructor() {
		this.logPrevValue = null
	}

    de2ra(degree) {
        return degree*(Math.PI/180);
    }
    isOdd(num) { return num % 2}
    map_range(from, to, s) {
        return to[0] + (s - from[0]) * (to[1] - to[0]) / (from[1] - from[0]);
    }
    Log(value) {
    	if (this.logPrevValue == null || (Math.round(this.logPrevValue * 1000) / 1000) !== (Math.round(value * 1000) / 1000)) {
    		console.log(value)
		}
		this.logPrevValue = value
	}
	colorLuminance(hex, lum) {

		// validate hex string
		hex = String(hex).replace(/[^0-9a-f]/gi, '');
		if (hex.length < 6) {
			hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
		}
		lum = lum || 0;

		// convert to decimal and change luminosity
		var rgb = "#", c, i;
		for (i = 0; i < 3; i++) {
			c = parseInt(hex.substr(i*2,2), 16);
			c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
			rgb += ("00"+c).substr(c.length);
		}

		return rgb;
	}
};


