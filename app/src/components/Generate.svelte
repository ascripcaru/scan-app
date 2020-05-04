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
        let parsedParams;
        try {
            queryString = decodeURIComponent(window.location.search.slice(1, window.location.search.length - 1));
            parsedParams = JSON.parse(queryString);
            parsedParams.riskLevel = getRiskLevel(parsedParams);
        } catch(e) {
            console.error('Err', e);
        }

        if (parsedParams) {
            qr = new QRious({
                element: document.getElementById('qr'),
                value: JSON.stringify(parsedParams),
                size: 2048,
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

    function getRiskLevel(params) {
        const matchingCode = cnps.find(c => c.code === params.cnp);

        if (matchingCode) {
            return matchingCode.riskLevel;
        }

        return 'low';
    }

</script>

<style>
    #qr {
        width: 90%;
        max-width: 500px;
        margin-top:15px;
    }
</style>

<canvas id="qr"></canvas>
