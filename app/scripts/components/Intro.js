export default  {
    data: function () {
        return {
            // State et pas count pour que toutes les mutations soient détectées
            state: store.state
        }
    },
    template: `<div class="intro">Page d'introduction
                   <button @click="switchToEntry">Commencer</button>
                </div>`,
    methods: {
        switchToEntry: function () {
            this.state.currentView = 'Entry';
        }
    }
};