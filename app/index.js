import './index.css';

import config from './scripts/config';

import OrbitControl from './scripts/vendors/OrbitControls'; // TODO: Add in scene3SD
import TweenLite from './scripts/Tools';
import Tools from './scripts/Tools';
import App from './scripts/App';

window.appConfig = config;
window.tools = new Tools();
window.app = new App();


// For three js browser extension 
window.scene = app.scene;
window.THREE = THREE;