
export function getIcon(plan) {
  let icon = 'cloud-outline';
  if(plan['_capabilities'] && plan['_capabilities'].indexOf('startPlan') !== -1 && plan['savingsAmount'] > 0){
    icon = 'cloud'
  } else if(plan['status'] === 'in-progress'){
    icon = 'rainy'
  }
  return icon
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

export function filtered(query, list) {
    return list.filter((el) =>
        el.name.toLowerCase().indexOf(query.toLowerCase()) > -1
    );
}

export function currencyConvert(value){
    return '£' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}



