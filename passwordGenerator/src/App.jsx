import { useCallback, useEffect, useState,useRef } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

function App() {
  const [length, setLength] = useState(8);
  const [number, setNumber] = useState(false);
  const [character, setCharacter] = useState(false);
  const [password, setPassword] = useState();

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqurstuvwxyz";
    if (number) str += "0123456789";
    if (character) str += "!@#$%^&*(){}[]~`_-+=?";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, number, character,setPassword]);
  useEffect(() => {
    passwordGenerator()
  }, [length, number, character,passwordGenerator]);

const copyToClickBoard = useCallback(()=>{
  passwordRef.current?.select()
  passwordRef.current?.setSelectionRange(0,20)
 window.navigator.clipboard.writeText(password)
},[password]) 

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-8 bg-gray-700 text-orange-500">
        <h1 className="text-white text-center my-3 ">PASSWORD GENERATOR</h1>
        <div className="flex shadow rounded-lg overFlow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3 "
            placeholder=" password"
            readOnly
            ref={passwordRef}

          />
          <button
          onClick={copyToClickBoard}
           className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0">
            copy
          </button>
        </div>
        <div className="flex text-sm gap-x-3">
          <div className="flex item-center gap-x-1">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              onChange={(e) => {
                setLength(e.target.value);
              }}
              className="cursor-pointer"
            />
            <label>Length: {length}</label>
          </div>
          <div className="flex item-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={number}
              id="numberInput"
              onChange={() => {
                setNumber((prev) => !prev);
              }}
            />
            <label>number</label>
          </div>
          <div className="flex item-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={character}
              id="charInput"
              onChange={() => {
                setCharacter((prev) => !prev);
              }}
            />
            <label>character</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
