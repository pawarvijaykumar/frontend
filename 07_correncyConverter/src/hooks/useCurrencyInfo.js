/*useState — for remembering values between renders

jsx
const [count, setCount] = useState(0);
count is the current value
setCount is the only way to change it (this is the rule you kept tripping on in your counter app — you can't do count = count + 1, you must do setCount(count + 1))
Calling setCount tells React "re-render this component with the new value"*/

import { useState, useEffect } from "react";

function useCurrencyInfo(currency) {
  const [data, setData] = useState({});

  useEffect(() => {
    fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${currency}.json`)
      .then((res) => res.json())
      .then((res) => setData(res[currency]));
  }, [currency]);

  return data;
}

export default useCurrencyInfo;