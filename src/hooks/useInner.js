export default function (dimensions, margin) {
  return [
    dimensions.width - margin.left - margin.right,
    dimensions.height - margin.top - margin.bottom,
  ];
}
