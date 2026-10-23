const piAPI = "https://api.pi.delivery/v1/pi";

async function getPi(...args) {
  let searchParam = "";

  const schema = [{ key: "start" }, { key: "numberOfDigits" }];
  const params = [];
  if (args.length > 0) {
    searchParam += "?";
    for (let i = 0; i < args.length; i++) {
      const { key } = schema[i];
      const value = args[i];
      params.push(key + "=" + value);
    }
    searchParam += params.join("&");
  }
  console.log(params);

  try {
    const url = piAPI + searchParam;
    console.log(url);
    const response = await fetch(url);
    if (!response.ok)
      throw new Error(`status ${response.status} ${response.statusText}`);
    const data = await response.json();
    console.log(data);
  } catch (e) {
    throw new Error(`failed to fetch piAPI: ${e}`);
  }
}

getPi(0, 1001);
