const fs = require('fs');

// Load your JSON data (replace 'data.json' with your JSON file)
const data = require('./fr.json');

// Function to remove duplicates and sort alphabetically
function removeDuplicatesAndSort(obj) {
  // Create a new Map to keep the last instance of each key
  const uniqueMap = new Map(Object.entries(obj));

  // Convert the Map back to an object and sort alphabetically by keys
  const sortedObj = Object.fromEntries([...uniqueMap.entries()].sort());

  return sortedObj;
}

// Remove duplicates and sort
const cleanedData = removeDuplicatesAndSort(data);

// Save the cleaned and sorted JSON object back to a file
fs.writeFileSync('cleaned_fr.json', JSON.stringify(cleanedData, null, 2));

console.log('Duplicates removed and JSON sorted successfully!');
