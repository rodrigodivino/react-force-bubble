export default function (objArr, acessor) {
  const array = objArr.map(acessor);
  return array.filter((value, index, self) => self.indexOf(value) === index);
}
