export default {
    data: function () {
        return {
            // State et pas count pour que toutes les mutations soient détectées
            state: store.state
        }
    },
    template: `<div>
        <input type="number" v-model.lazy="state.minYear" min="1960" max="2014" placeholder="annee">
        <!--<input type="text" v-model.lazy="state.country" placeholder="">-->
        <v-select v-model.lazy="state.country" :options="state.countries"></v-select>
        <button @click="switchToMain">Generate</button>
        </div>`,
    methods: {
        switchToMain: function () {
            this.state.currentView = 'Scene';
        }
    }
};