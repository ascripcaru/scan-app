<script>
    import { tick } from 'svelte';
    import jsQR from 'jsqr';

    let decoded = false;
    let isStreaming = false;
    let canvasElement;
    let canvas;
    let loadingMessage;
    let outputContainer;
    let outputMessage;
    let outputData;
    let video = document.createElement('video');

    async function selectElements() {
        await tick();

        canvasElement = document.getElementById('canvas');
        canvas = canvasElement.getContext('2d');
        loadingMessage = document.getElementById('loadingMessage');
        outputContainer = document.getElementById('output');
        outputMessage = document.getElementById('outputMessage');
        outputData = document.getElementById('outputData');
    }

    function captureTick() {
        loadingMessage.innerText = '⌛ Loading video...';

        if (video.readyState === video.HAVE_ENOUGH_DATA) {
            loadingMessage.hidden = true;
            canvasElement.hidden = false;

            canvasElement.height = video.videoHeight;
            canvasElement.width = video.videoWidth;
            canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);
            var imageData = canvas.getImageData(0, 0, canvasElement.width, canvasElement.height);
            var code = jsQR(imageData.data, imageData.width, imageData.height, {
                inversionAttempts: 'dontInvert',
            });
            if (code && code.data.length) {
                decoded = true;

                selectElements();
                onDecode(code);
            } else {
                requestAnimationFrame(captureTick);
            }
        } else {
            requestAnimationFrame(captureTick);
        }
    }

    async function onDecode(code) {
        await tick();

        outputMessage.hidden = true;
        outputData.innerText = code.data;
        video.srcObject.getTracks().forEach(track => track.stop());
        document.getElementById('canvas').remove();
    }

    function startStreaming() {
        navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } }).then(function(stream) {
            video.srcObject = stream;
            video.setAttribute('playsinline', true);
            video.play();
            requestAnimationFrame(captureTick);
        }, (err) => {
            document.write('err', err);
        });
    }

    async function capture() {
        isStreaming = true;

        selectElements();
        startStreaming();
    }

    capture();
</script>

<main>
    <div id="reader">
        {#if isStreaming}
            <div id="loadingMessage" hidden="">⌛ Loading video...</div>
            <canvas id="canvas" height="320" width="320"></canvas>
        {/if}

        {#if decoded}
            <div id="output">
                <div id="outputMessage">No QR code detected.</div>
                <div hidden=""><b>Data:</b> <span id="outputData"></span></div>
            </div>
        {/if}
    </div>
</main>

<style>
    #canvas {
    }
</style>
