export default  {
    data: function () {
        return {
            // State et pas count pour que toutes les mutations soient détectées
            state: store.state
        }
    },
    template: `<div>
                <div class="bigYear">{{ state.year }}</div>
                <timeline></timeline>
                <div id="scene"></div>
                </div>`,
    mounted: function () {
        app.scene3D.init();
    }
};
