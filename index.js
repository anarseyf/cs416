const callback = (data) => {
  console.log("Data", data);
};

window.onload = async () => {
  const data = await d3.csv("./data/circuits.csv");
  callback(data);
};
