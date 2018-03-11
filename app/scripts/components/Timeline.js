export default  {
    data: function () {
        return {
            // State et pas count pour que toutes les mutations soient détectées
            state: store.state
        }
    },
    template: `<div id="timeline" class="timeline">
                    <input class="timeline__range" type="range" :min="state.minYear" :max="state.maxYear" step="1" value="0" v-model="state.year">
                    <div class="birth_date">{{state.minYear}}</div>
                    <div class="now">{{state.maxYear}}</div>
                </div>`,
};
