export default  {
    data: function () {
        return {
            // State et pas count pour que toutes les mutations soient détectées
            state: store.state
        }
    },
    template: `<div id="timeline" class="timeline">
                    <button ref="tlPlayBtn" class="timeline__player">
                        <svg version="1.1" id="play-icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" 
                        width="13.9px" height="18px" viewBox="-40 240.9 13.9 18" style="enable-background:new -40 240.9 13.9 18;" xml:space="preserve">
                            <path d="M-39.2,258.8c-0.5-0.2-0.8-0.8-0.8-1.3v-15c0-0.6,0.3-1.1,0.8-1.4s1.1-0.2,1.6,0.1l10.8,7.5c0.4,0.3,0.7,0.7,0.7,1.2
                                s-0.2,0.9-0.7,1.2l-10.8,7.5l0,0C-38.2,259-38.8,258.9-39.2,258.8z M-38.1,257.9L-38.1,257.9L-38.1,257.9z M-38,243.4v13.2l9.5-6.6
                                L-38,243.4z"/>
                        </svg>
                    </button>
                    <input id="timeline__range" class="timeline__range" ref="tlRange" type="range" :min="state.minYear" :max="state.maxYear" step="1" value="0" v-model="state.year">
                    <div class="birth_date">{{state.minYear}}</div>
                    <div class="now">{{state.maxYear}}</div>
                </div>`
};
