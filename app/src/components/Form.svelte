<script>
    import { navigate } from 'svelte-routing';

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
</script>

<main>
    <div class="row">
        <div class="col-6">
            <form class="text-left ml-4">
                <div class="form-group">
                    <label for="name">Nume</label>
                    <input id="name" type="text" class="form-control" bind:value={formData.name}>
                </div>
                <div class="form-group">
                    <label for="cnp">CNP</label>
                    <input id="cnp" type="text" class="form-control" bind:value={formData.cnp}>
                </div>
                <div class="form-group">
                    <label for="address">Adresă</label>
                    <input id="address" type="text" class="form-control" bind:value={formData.address}>
                </div>
            </form>
            <button on:click={submitForm} class="btn btn-primary">Submit</button>
        </div>
    </div>
</main>

<style></style>
