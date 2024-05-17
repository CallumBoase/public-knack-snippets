//Open your Knack app front-end in chrome
//Right click on the page and click "Inspect".
//On the inspector window that opens, click "Console"
//Copy this code into the console window & hit enter
//A CSV will be downloaded to your computer with your Knack scene data

function getSceneCsv() {
    const scenes = Knack.scenes.models.map(scene =>  {
        return {
            name: scene.attributes.name,
            slug: scene.id,
            authenticated: scene.attributes.authenticated,
            id: scene.attributes.key
        }
    });

    function convertToCSV(arr) {
        const array = [Object.keys(arr[0])].concat(arr);
        
        return array.map(row => {
            return Object.values(row).map(value => {
                return value.toString().replace(/,/g, ''); // Remove commas to avoid CSV format issues
            }).join(',');
        }).join('\n');
    }

    return convertToCSV(scenes);
}

function downloadCSV(content, fileName) {
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

function getFormattedDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}`;
}

var csv = getSceneCsv();
var dateStamp = getFormattedDate();
downloadCSV(csv, `scenes_${dateStamp}.csv`);

