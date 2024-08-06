const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {

    // Prevent the default behavior
    event.preventDefault();

    // Save the event for later
    window.deferredPrompt = event;

    // Show the install button
    butInstall.classList.toggle('hidden', false);

    // Log the event
    console.log('beforeinstallprompt fired');
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    if (!window.deferredPrompt) {
        return;
    }

    // Show the install prompt
    window.deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const { outcome } = await window.deferredPrompt.userChoice;
    console.log(`User response to the install prompt: ${outcome}`);

    // Hide the install button
    butInstall.classList.toggle('hidden', true);

});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    // Log the event
    console.log('appinstalled fired', event);
    // Hide the install button
    butInstall.classList.toggle('hidden', true);
});
