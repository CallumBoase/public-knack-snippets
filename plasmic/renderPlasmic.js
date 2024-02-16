//Example usage of renderPlasmic function, to render a plasmic page called Homepage into a Knack app
//Replace view_XX with the correct view key of the view that should trigger start of the Plasmic render eg view_5

$(document).on('knack-view-render.view_XX', async function (event, view, record) {

    //Replace the variables below with the correct options for your Knack app (targetDiv) and Plasmic project (projectId, publicToken  etc)
    renderPlasmic({
        //The CSS selector of a div on the page. Eg a rich text view containing html <div id="home-page">Loading...</div>
        targetDiv: '#home-page', 
        //preview or published
        mode: 'preview',
        //project ID of the plasmic project (see URL in plasmic studio)
        projectId: 'XXXXXX',
        //Public token of your project - obtained via Plasmic studio -> Code button
        publicToken: 'YYYYYY', 
        //The name of your plasmic component or page to render
        componentOrPageName: 'Homepage', 
        //true or false. Indicate whether your component or page has a data query. If true, data will be prefetched & cached before render.
        hasDataQuery: 
    });
    
});

//Generic helper function to render a plasmic page or component into a html page (such as a Knack page) (used above)
//Documentation: https://docs.plasmic.app/learn/render-api/
async function renderPlasmic(config = { targetDiv, mode, projectId, publicToken, componentOrPageName, hasDataQuery }) {

    //Extract variables from config object
    const { targetDiv, mode, projectId, publicToken, componentOrPageName, hasDataQuery} = config;

    //Determine the value for prePass setting (based on whether there is a data query in the component or page)
    const prePassVal = hasDataQuery ? 1 : 0;

    //Fetch html from Plasmic
    const response = await fetch(`https://codegen.plasmic.app/api/v1/loader/html/${mode}/${projectId}/${componentOrPageName}?hydrate=1&embedHydrate=1&prepass=${prePassVal}&maxAge=3600`, {
        headers: {
            'x-plasmic-api-project-tokens': `${projectId}:${publicToken}`
        }
    });
    const result = await response.json();

    // Create or reuse a shadow root for the targetDiv (shadowRoot method ensures no styling conflicts between Knack & Plasmic page/component)
    // Note the use of shadowRoot is DIFFERENT to the auto-generated code from Plasmic studio
    const homePageElement = document.querySelector(targetDiv);
    let shadowRoot = homePageElement.shadowRoot;
    if (!shadowRoot) {
        // If no shadowRoot exists, create a new shadow DOM
        shadowRoot = homePageElement.attachShadow({ mode: 'open' });
    }

    // Insert the fetched HTML into the shadow DOM
    shadowRoot.innerHTML = result.html;

    // Hydrate the Plasmic HTML with any required javascript once the HTML has loaded (to enable page interactivity)
    if (window.__plasmicHydrater) {
        window.__plasmicHydrater.hydrateAll(shadowRoot);
    } else {
        var script = document.createElement('script');
        script.src = 'https://codegen.plasmic.app/static/js/loader-hydrate.js';
        script.onload = function () {
            if (window.__plasmicHydrater) {
                window.__plasmicHydrater.hydrateAll(shadowRoot);
            }
        };
        document.body.appendChild(script);
    }
}
