// Use this presets array inside your presetHandler
const presets = require('./presets');

// Complete this function:
const presetHandler = (request, index, newPresetArray) => {
  let myArray = [];
  // Check if request is valid and return error 400 if not
  if (request !== 'GET' && request !== 'PUT'){
    myArray = [400];
    return myArray;
  }
  // Check if index is valid and return error 404 if not
  if (index < 0 || index > 16 || isNaN(index)) {
    myArray = [404];
    return myArray;
  }

  // Differentiate between GET and PUT
  if (request === 'GET') {
    myArray.push(200);
    myArray.push(presets[index]);
  }
  if (request === 'PUT') {
    myArray.push(200);
    presets[index] = newPresetArray;
    myArray.push(newPresetArray);
  }

  return myArray;
};

// Leave this line so that your presetHandler function can be used elsewhere:
module.exports = presetHandler;
