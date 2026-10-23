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
    console.log(response);
    if (!response.ok) {
      const reason = await response.text();
      throw new Error(`status ${response.status} ${reason}`);
    }
    const data = await response.json();
    console.log(data);
  } catch (e) {
    throw new Error(`failed to fetch piAPI: ${e}`);
  }
}

getPi(1, 1000);
