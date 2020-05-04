import Form from './components/Form.svelte';
import Generate from './components/Generate.svelte';
import Scan from './components/Scan.svelte';

function isAdminUser() {
    return true;
}

const routes = [
    {
        name: '/',
        component: Form,
    },
    {
        name: 'scan',
        component: Scan,
        onlyIf: { guard: isAdminUser, redirect: '/' }
    },
    {
        name: 'generate',
        component: Generate,
    }
];

export { routes };
