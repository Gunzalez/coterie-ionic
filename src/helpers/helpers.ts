
export function getIcon(plan) {
  let icon = 'cloud-outline';
  if(plan['_capabilities'] && plan['_capabilities'].indexOf('startPlan') !== -1 && plan['savingsAmount'] > 0){
    icon = 'cloud'
  } else if(plan['status'] === 'in-progress'){
    icon = 'rainy'
  }
  return icon
}
