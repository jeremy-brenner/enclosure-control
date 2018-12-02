
const LinearScale = (domainMin, domainMax, rangeMin, rangeMax) => {
  let rangeLength = rangeMax - rangeMin;
  let domainLength = domainMax - domainMin;
  let scaleMultiplier = rangeLength / domainLength;
  return (value) => {
    return ( value - domainMin ) * scaleMultiplier + rangeMin;
  }
}

export default LinearScale;