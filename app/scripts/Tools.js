// Tools
export default class Tools {
    de2ra(degree) {
        return degree*(Math.PI/180);
    }
    isOdd(num) { return num % 2}
    map_range(from, to, s) {
        return to[0] + (s - from[0]) * (to[1] - to[0]) / (from[1] - from[0]);
    };
};


