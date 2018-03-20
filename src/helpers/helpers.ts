
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
