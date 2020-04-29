<script>
    import { navigate } from 'svelte-routing';
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
        navigate(`/generate?${getFormData()}`, { replace: true, formData });
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
            </form>
            {#if !disabled}
                <button on:click={submitForm} class="btn btn-primary">Submit</button>
            {/if}
        </div>
    </div>
</main>

<style>
    .basic-form {
        max-width: 500px;
    }
</style>
