<script>
    import { onMount } from 'svelte';
    import QRious from 'qrious';

    let qr;
    let queryString;
    let cnps = [
        {
            code: '2468',
            riskLevel: 'high'
        },
        {
            code: '1357',
            riskLevel: 'medium'
        },
        {
            code: '0000',
            riskLevel: 'low'
        }
    ];
    let colorsMap = {
        low: 'green',
        medium: 'orange',
        high: 'red'
    };

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
                size: 1024,
                foreground: getColor(queryString)
            })
        }
    });

    function getColor(string) {
        const parsedString = JSON.parse(string);
        const { cnp } = parsedString;
        const matchingCode = cnps.find(c => c.code === cnp);

        if (matchingCode) {
            return colorsMap[matchingCode.riskLevel];
        }

        return colorsMap.low;

    }
</script>

<style>
    #qr {
        width: 100%;
        max-width: 500px;
        margin-top:15px;
    }
</style>

<canvas id="qr"></canvas>
