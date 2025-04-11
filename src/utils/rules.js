function ipOrRangeRule(v, t) {
  const ipFormat =
    /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(?:\/(?:3[0-2]|[1-2]?[0-9]))?$|^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.)?(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(?:\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){2}$/
  return v && !v.match(ipFormat) ? t('IP_FORMAT_REQUIRED') : true
}

function requiredRule(v, t) {
  return !!v || t('Required')
}

function numberRule(v, t) {
  return v && isNaN(v) ? t('NUMBER_REQUIRED') : true
}

function ipRule(v, t) {
  const ipFormat =
    /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
  return v && !v.match(ipFormat) ? t('IP_FORMAT_REQUIRED') : true
}

export { ipOrRangeRule, requiredRule, numberRule, ipRule }
