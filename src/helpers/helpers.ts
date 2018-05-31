
export function getIcon(plan) {
  let icon = 'cloud-outline';
  if(plan['_capabilities'] && plan['_capabilities'].indexOf('startPlan') !== -1 && plan['savingsAmount'] > 0){
    icon = 'cloud'
  } else if(plan['status'] === 'in-progress'){
    icon = 'rainy'
  }
  return icon
}

export function ordinal_suffix_of(i) {
  let j = i % 10,
    k = i % 100;
  if (j == 1 && k != 11) {
    return i + "st";
  }
  if (j == 2 && k != 12) {
    return i + "nd";
  }
  if (j == 3 && k != 13) {
    return i + "rd";
  }
  return i + "th";
}

export function sortList(list){
  list.sort(function(a, b){
      if(a.name < b.name) return -1;
      if(a.name > b.name) return 1;
      return 0;
  });
}

export function isEquivalent(a, b) {
    // Create arrays of property names
    let aProps = Object.keys(a);
    let bProps = Object.keys(b);

    // If number of properties is different, are not equivalent
    if (aProps.length != bProps.length) {
      return false;
    }

    for (let i = 0; i < aProps.length; i++) {
      let propName = aProps[i];

      // If values of same property are not equal, objects are not equivalent
      if (a[propName] !== b[propName]) {
        return false;
      }
    }

    // If we made it this far, objects are considered equivalent
    return true;
}
