import './css/index.css';
import './css/animate.css';

import config from './scripts/config';

//import OrbitControl from './scripts/vendors/OrbitControls'; // TODO: Add in scene3SD
import Easing from './scripts/vendors/easing';
//import TweenLite from 'gsap/src/minified/TweenLite.min.js';
import Store from './scripts/Store';
import Tools from './scripts/Tools';
import AttractButtons from './scripts/modules/AttractButtons.js';
import App from './scripts/App';

window.Easing = Easing;
window.appConfig = config;
window.store = new Store();
window.tools = new Tools();
window.AttractButton = AttractButtons;
window.app = new App();


// For three js browser extension 
window.scene = app.scene3D.scene;
window.THREE = THREE;