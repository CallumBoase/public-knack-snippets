//Function to run before Knack finishes loading - load external scripts including the script to render plasmic into html
KnackInitAsync = function($, callback) {

    // REQUIRED: Explicitly include jQuery
    window.$ = $;

    //External JS scripts to load
    const scripts = [
        {src: 'https://render-plasmic-into-html.netlify.app/customComponents.js'}
    ]

    loadScripts(
        scripts, 
        callback,
        () => {console.log('error loading scripts')}
    );
    
}

//Render the the plasmic component into a Knack page
//Uses the plasmic react-api https://docs.plasmic.app/learn/react-api/
//And a wrapper function allowing this method to work in plain html (source code: https://github.com/CallumBoase/render-plasmic-into-html)

//Replace view_XX with the correct view key of the view that should trigger start of the Plasmic render eg view_5 
$(document).on('knack-view-render.view_XX', function(event, view){
  
  // Replace the variables below with the appropriate options
  window.customComponents.render.plasmicComponent({
    
    //Id of the div or html element to render inside. 
    //Eg a rich text view containing html <div id="home-page">Loading...</div>
    targetDiv: 'home-page',
    
    //true/false Whether or not to render into a shadow DOM to isolate Knack styles from Plasmic (recommended: true)
    useShadowDOM: true,
    
    //project ID of the plasmic project (see the URL of your project in Plasmic Studio)
    projectId: '23nVaN6xopCUFKwsSQDpSG',
    
    //Public token of your project - obtained via Plasmic studio -> Code button
    publicToken: 'EbHQY6Hvf1K63S3jgPUIBc1kkViaftdMwpeJPXw5FOWkWUWT5kKGlcdMqbH7MSrAT3bIiRCtieDhIvuAQ',
    
    //true/false. Whether to render the latest version of your Plasmic page/component even if unpublished. 
    //Recommended: true for development, false for production
    preview: true,
    
    //The name of your plasmic component or page to render (according to Plasmic studio)
    component: 'Homepage',
    
    //Any props you want to pass into your component see react-api docs above
    componentProps: {}
  
  });
})

//Generic Helper function to load scripts into a Knack app
const loadScripts = (scripts, onSuccess, onFailure) => {
    let loadedScripts = 0;
    let failedScripts = 0;

    if(typeof onSuccess !== 'function'){
        onSuccess = function(){
            console.log('Scripts loaded');
        }
    }

    if(typeof onFailure !== 'function'){
        onFailure = function(){
            console.error('Failed to load scripts');
        }
    }

    scripts.forEach(({ src, type }) => {
        const script = document.createElement('script');
        script.src = src;
        if (type) {
            script.type = type;
        }

        script.addEventListener('load', () => {
            loadedScripts++;
            if (loadedScripts === scripts.length) {
                onSuccess();
            }
        });

        script.addEventListener('error', () => {
            failedScripts++;
            onFailure();
        });

        document.body.appendChild(script);
    });
};
