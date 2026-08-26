import { useState } from "react"
import {InputBox} from "./components"

import useCurrencyInfo from "./hooks/useCurrencyInfo.js"


function App() {
  const [amount, SetAmount] = useState(0)
 
  const [from, setFrom]=useState("usd")//from to from
  const [to, setTo]=useState("inr")
  const [convertedAmount, setConvertedAmount]=useState(0)
  const currencyInfo = useCurrencyInfo(from)
  const options = Object.keys(currencyInfo)
  const swap=()=>{
    setFrom(to)
    setTo(from)
    setConvertedAmount(amount)
    SetAmount(convertedAmount)
   }
  const convert=()=>{
    setConvertedAmount(amount*currencyInfo[to])

  }
  

  return (
    <div
        className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
        style={{
          backgroundColor:`https://imgs.search.brave.com/V3wM9yww_fcJYos8clmbu9vUf5tXvfSp3VpKV6bM9cw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJjYXQuY29t/L3cvZnVsbC8xLzEv/Zi8yMjg5MC0zODQw/eDIxNjAtZGVza3Rv/cC00ay1icmVha2lu/Zy1iYWQtd2FsbHBh/cGVyLXBob3RvLmpw/Zw`,

        }}
    >
        <div className="w-full">
            <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
                <form
                    onSubmit={(e)=>{
                        e.preventDefault();
                        convert()
                       
                    }}

                >  

                    <div className="w-full mb-1">
                        <InputBox
                            label="From"
                            amount={amount}
                            currencyOptions={options}
                            onCurrencyChange={(currency) => SetAmount(amount)}
                            selectCurrency={from}
                            onAmountChange={(amount)=>SetAmount(amount)}
                        />
                    </div>
                    <div className="relative w-full h-0.5">
                        <button
                            type="button"
                            className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                            onClick={swap}
                        >
                            swap//swapm the to currency from usd to inne dependopen
                        </button>
                    </div>

                    <div className="w-full mt-1 mb-4">
                        <InputBox
                            label="To"
                            amount={convertedAmount}
                            currencyOptions={options}
                            onCurrencyChange={(currency) => setTo(currency)}
                            selectCurrency={from}
                            amountDisable
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg">
                        Convert {from.toUpperCase()} to {to.toUpperCase()}
                    </button>
                </form>
            </div>
        </div>
    </div>

        
   

  )
}

export default App
