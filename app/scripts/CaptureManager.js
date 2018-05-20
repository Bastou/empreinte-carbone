import html2canvas from 'html2canvas/dist/html2canvas.min.js';

export default class CaptureManager {

    constructor() {}

    takeCapture(id) {
        html2canvas(id).then(function(canvas) {
            var dataURL = canvas.toDataURL();
            //generated dataURL is now placed as src of a img tag
            var $screenshot = document.getElementById("scene-screenshot");
            $screenshot.src = dataURL;


            // New version of file download using toBlob.
            // toBlob should be faster than toDataUrl.
            // But maybe not because also calling createOjectURL.
            //
            //renderer.render(scene, camera);
            canvas.toBlob(function(blob){
                var a = document.createElement('a');
                var url = URL.createObjectURL(blob);
                a.href = url;
                a.download = 'mon-empreinte-carbone.png';
                a.click();
            }, 'image/png', 1.0);
        });
    }

};
export let captureManager = new CaptureManager();
