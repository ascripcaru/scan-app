<script>
    import { onMount } from 'svelte';
    import QRious from 'qrious';

    let qr;
    let queryString;

    onMount(() => {
        try {
            queryString = decodeURIComponent(window.location.search.slice(1, window.location.search.length));
        } catch(e) {
            console.error('Err', e);
        }

        if (queryString) {
            qr = new QRious({
                element: document.getElementById('qr'),
                value: queryString,
                size: 1024
            })
        }
    });
</script>

<style>
    #qr {
        width: 500px;
        height: 500px;
        margin-top:15px;
    }
</style>

<canvas id="qr"></canvas>
