export default  {
    data: function () {
        return {
            // State et pas count pour que toutes les mutations soient détectées
            state: store.state
        }
    },
    template: `<div id="timeline" class="timeline">
                    <div class="timeline__value">{{ state.co2 }}</div>
                    <input class="timeline__range" type="range" :min="state.minYear" :max="state.maxYear" step="1" value="0" v-model="state.year">
                    <div class="timeline__year timeline__year--min">{{state.minYear}}</div>
                    <div class="timeline__year timeline__year--max">{{state.maxYear}}</div>
                </div>`,
};
