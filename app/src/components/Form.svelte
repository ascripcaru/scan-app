<script>
    import { navigateTo } from 'svelte-router-spa';
    import { onMount } from 'svelte';

    let formData = {
        name: '',
        cnp: '',
        address: ''
    };

    function getFormData() {
        return JSON.stringify(formData);
    }

    function submitForm() {
        navigateTo(`/generate?${getFormData()}`, { replace: true, formData });
    }

    onMount(() => {
        if (propFormData) {
            formData = { ...propFormData };
        }
    });

    export let disabled;
    export let propFormData;
</script>

<main>
    <div class="container">
        <div class="basic-form">
            {#if !disabled}
                <a href="/" class="app-title d-flex align-items-center justify-content-center text-primary">
                    <i class="logo mr-2 fas fa-qrcode" style="font-family: 'FontAwesome';"></i><h6 class="m-0">COVID-19 Check</h6>
                </a>
            {/if}
            <form class="text-left ml-2 mr-2">
                <div class="form-group">
                    <label for="name">Nume</label>
                    <input id="name" type="text" class="form-control" disabled={disabled} bind:value={formData.name}>
                </div>
                <div class="form-group">
                    <label for="cnp">CNP</label>
                    <input id="cnp" type="text" class="form-control" disabled={disabled} bind:value={formData.cnp}>
                </div>
                <div class="form-group">
                    <label for="address">Adresă</label>
                    <input id="address" type="text" class="form-control" disabled={disabled} bind:value={formData.address}>
                </div>
                {#if !disabled}
                    <div class="form-group">
                        <label for="photo">Fotografie CI / Selfie</label>
                        <input style="line-height: 1em;" type="file" class="form-control">
                    </div>
                {/if}
            </form>
            {#if !disabled}
                <button on:click={submitForm} class="btn btn-primary">Submit</button>
            {/if}
        </div>
    </div>
</main>

<style type="text/scss">
    .basic-form {
        max-width: 500px;
    }
    .app-title {
        line-height: 1em;

        .logo {
            font-family: 'FontAwesome';
            font-style: initial;
            font-size: 20px;
        }
    }
</style>
