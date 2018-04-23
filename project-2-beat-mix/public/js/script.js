// Drum Arrays
let kicks = [];
let snares = [];
let hiHats = [];
let rideCymbals = [];
for (let i = 0; i < 16; i++) {
  kicks.push(false);
  snares.push(false);
  hiHats.push(false);
  rideCymbals.push(false);
}

function toggleDrum(drum, index) {
  switch(drum) {
    case 'kicks':
    if (kicks[index] === false) {
      kicks[index] = true;
    } else if (kicks[index] === true) {
      kicks[index] = false;
    }
    break;
    case 'snares':
    if (snares[index] === false) {
      snares[index] = true;
    } else if (snares[index] === true) {
      snares[index] = false;
    }
    break;
    case 'hiHats':
    if (hiHats[index] === false) {
      hiHats[index] = true;
    } else if (hiHats[index] === true) {
      hiHats[index] = false;
    }
    break;
    case 'rideCymbals':
    if (rideCymbals[index] === false) {
      rideCymbals[index] = true;
    } else if (rideCymbals[index] === true) {
      rideCymbals[index] = false;
    }
    break;
    default:
    return "Error, incorrect drum input."
  }
}

function clear(drum) {
  switch(drum) {
    case 'kicks':
    for (let j = 0; j < kicks.length; j++) {
      kicks[j] = false;
    }
    break;
    case 'snares':
    for (let j = 0; j < snares.length; j++) {
      snares[j] = false;
    }
    break;
    case 'hiHats':
    for (let j = 0; j < hiHats.length; j++) {
      hiHats[j] = false;
    }
    break;
    case 'rideCymbals':
    for (let j = 0; j < rideCymbals.length; j++) {
      rideCymbals[j] = false;
    }
    break;
    default:
    return "Error, incorrect drum input."
  }
}

function invert(drum) {
  switch(drum) {
    case 'kicks':
    for (let j = 0; j < kicks.length; j++) {
      if (kicks[j] === false) {
        kicks[j] = true;
      }
      else if (kicks[j] === true) {
        kicks[j] = false;
      }
    }
    break;
    case 'snares':
    for (let j = 0; j < snares.length; j++) {
      if (snares[j] === false) {
        snares[j] = true;
      }
      else if (snares[j] === true) {
        snares[j] = false;
      }
    }
    break;
    case 'hiHats':
    for (let j = 0; j < hiHats.length; j++) {
      if (hiHats[j] === false) {
        hiHats[j] = true;
      }
      else if (hiHats[j] === true) {
        hiHats[j] = false;
      }
    }
    break;
    case 'rideCymbals':
    for (let j = 0; j < rideCymbals.length; j++) {
      if (rideCymbals[j] === false) {
        rideCymbals[j] = true;
      }
      else if (rideCymbals[j] === true) {
        rideCymbals[j] = false;
      }
    }
    break;
    default:
    return "Error, incorrect drum input."
  }
}

function getNeighborPads(x, y, size) {
  let neighborArray = [];

  // Check that x and y are within size range
  // If not, return empty array
  if (x < 0 || x >= size || y < 0 || y >= size) {
    return neighborArray;
  }

  // Get left neighbor
  // Check if there is one
  if (x !== 0) {
    neighborArray.push([x-1, y]);
  }

  // Get right neighbor
  // Check if there is one
  if (x !== size - 1) {
    neighborArray.push([x+1, y]);
  }

  // Get bottom neighbor
  // Check if there is one
  if (y !== 0) {
    neighborArray.push([x, y-1]);
  }

  // Get top neighbor
  // Check if there is one
  if (y !== size - 1) {
    neighborArray.push([x, y+1]);
  }
  return neighborArray;
}
