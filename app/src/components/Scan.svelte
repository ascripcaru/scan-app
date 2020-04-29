<script>
    import { tick } from 'svelte';
    import jsQR from 'jsqr';
    import Form from './Form.svelte';
    import QRious from 'qrious';

    let decoded = false;
    let isStreaming = false;
    let canvasElement;
    let canvas;
    let loadingMessage;
    let outputContainer;
    let outputMessage;
    let video = document.createElement('video');
    let formData;
    let generatedQr;
    let colorsMap = {
        low: 'green',
        medium: 'orange',
        high: 'red'
    };

    async function selectElements() {
        await tick();

        canvasElement = document.getElementById('canvas');
        canvas = canvasElement.getContext('2d');
        loadingMessage = document.getElementById('loadingMessage');
        outputContainer = document.getElementById('output');
        outputMessage = document.getElementById('outputMessage');
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
                inversionAttempts: 'attemptBoth',
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

        drawLine(code.location.topLeftCorner, code.location.topRightCorner, '#FF3B58');
        drawLine(code.location.topRightCorner, code.location.bottomRightCorner, '#FF3B58');
        drawLine(code.location.bottomRightCorner, code.location.bottomLeftCorner, '#FF3B58');
        drawLine(code.location.bottomLeftCorner, code.location.topLeftCorner, '#FF3B58');

        outputMessage.hidden = true;
        isStreaming = false;

        video.srcObject.getTracks().forEach(track => track.stop());
        formData = JSON.parse(code.data);
        redrawCode();
    }

    async function redrawCode() {
        await tick();

        generatedQr = new QRious({
            element: document.getElementById('generated'),
            value: JSON.stringify(formData),
            size: 1024,
            foreground: colorsMap[formData.riskLevel || 'green']
        })
    }

    function getColor() {

    }

    async function startStreaming() {
        await tick();

        const options = {
            video: {
                facingMode: 'environment'
            }
        };

        const userMedia = await navigator.mediaDevices.getUserMedia(options);

        video.srcObject = userMedia;
        video.setAttribute('playsinline', true);
        video.play();
        requestAnimationFrame(captureTick);
    }

    async function capture() {
        isStreaming = true;

        selectElements();
        startStreaming();
    }

    function stopCapture() {
        video.srcObject.getTracks().forEach(track => track.stop());
        isStreaming = false;
    }

    function drawLine(begin, end, color) {
        canvas.beginPath();
        canvas.moveTo(begin.x, begin.y);
        canvas.lineTo(end.x, end.y);
        canvas.lineWidth = 4;
        canvas.strokeStyle = color;
        canvas.stroke();
    }
</script>

<main>
    <div id="reader" class="container-fluid d-flex flex-column align-items-center">
        {#if !isStreaming}
            <button class="btn btn-success" on:click={capture}>Start streaming</button>
        {:else}
            <button class="btn btn-danger" on:click={stopCapture}>Stop streaming</button>
        {/if}

        {#if isStreaming}
            <div id="loadingMessage" hidden="">⌛ Loading video...</div>
            <canvas id="canvas" height="720" width="1280"></canvas>
        {/if}

        {#if decoded}
            <div id="output">
                <div id="outputMessage">No QR code detected.</div>
                {#if formData}
                    <canvas id="generated"></canvas>
                    <Form disabled="true" propFormData={formData} />
                {/if}
            </div>
        {/if}
    </div>
</main>

<style>
    #generated {
        width: 90%;
        max-width: 500px;
        margin-top:15px;
    }
</style>
