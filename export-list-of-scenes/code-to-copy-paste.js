//In a tab with your Knack app front-end open,
//open the browser console and copy paste this code, then press enter
//Copy the resulting output to notepad and save as a .csv file
//Open the CSV file in Excel or similar

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

var csv = getSceneCsv();
console.log(csv);
