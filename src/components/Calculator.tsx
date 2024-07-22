import { useState, useEffect } from "react";
import { operations } from "../utils/operations";
import { NumberButton } from "./common/NumberButton";
import { OperatorButton } from "./common/OperatorButton";

export const Calculator = () => {
  const [input, setInput] = useState<string>(""); // 사용자 입력
  const [userInput, setUserInput] = useState<string>("");
  const [previousValue, setPreviousValue] = useState<number | null>(null); // 이전 계산값
  const [operator, setOperator] = useState<string | null>(null); // 현재 연산자

  /**숫자 또는 점 클릭 함수 */
  const handleClickNumber = (num: string) => {
    setInput((prev) => prev + num);
  };

  /**연산 버튼 클릭 함수 */
  const handleClickOperator = (symbol: string) => {
    setOperator(symbol);
    if (previousValue && operator && input) {
      handleCalculationResult(symbol);
    } else if (["+", "-", "×", "÷", "%", "^"].includes(symbol)) {
      if (input) {
        setPreviousValue(parseFloat(input));
        setInput("");
        setUserInput(input);
      }
    }
  };

  /**계산 결과 함수 */
  const handleCalculationResult = (symbol: string) => {
    if (["+", "-", "×", "÷", "%", "^", "="].includes(symbol)) {
      if (previousValue && operator && input) {
        const result = operations[operator](previousValue, parseFloat(input));
        setInput("");
        setUserInput(result.toString());
        setPreviousValue(result);
      }
    }
  };

  /**키보드 입력 처리 함수 */
  const handleKeyPress = (e: KeyboardEvent) => {
    const { key } = e;

    if (!isNaN(parseFloat(key)) || key === ".") {
      handleClickNumber(key);
    } else if (
      key === "+" ||
      key === "-" ||
      key === "*" ||
      key === "/" ||
      key === "%" ||
      key === "^"
    ) {
      handleClickOperator(key === "*" ? "×" : key === "/" ? "÷" : key);
    } else if (key === "Enter") {
      handleCalculationResult("=");
    } else if (key === "Backspace") {
      setInput((prev) => prev.slice(0, -1));
    } else if (key === "Escape") {
      setInput("");
      setPreviousValue(null);
      setOperator(null);
      setUserInput("");
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [input, previousValue, operator]);

  return (
    <div className="w-[400px] h-[367px] bg-midnight p-25px">
      <div
        className="w-[350px] h-[70px]  rounded-[20px]  bg-dark-blue flex items-center
        pr-3 font-inter text-[32px]"
      >
        <input
          className="text-white  ml-auto  bg-dark-blue"
          readOnly
          value={input || userInput}
        ></input>
      </div>
      <div className="mt-22px">
        <div className="flex">
          <NumberButton value={"1"} onClick={handleClickNumber} />
          <NumberButton value={"2"} onClick={handleClickNumber} />
          <NumberButton value={"3"} onClick={handleClickNumber} />
        </div>
        <div className="flex">
          <NumberButton value={"4"} onClick={handleClickNumber} />
          <NumberButton value={"5"} onClick={handleClickNumber} />
          <NumberButton value={"6"} onClick={handleClickNumber} />
        </div>
        <div className="flex">
          <NumberButton value={"7"} onClick={handleClickNumber} />
          <NumberButton value={"8"} onClick={handleClickNumber} />
          <NumberButton value={"9"} onClick={handleClickNumber} />
        </div>
        <div className="flex">
          <NumberButton value={"."} onClick={handleClickNumber} />
          <NumberButton value={"0"} onClick={handleClickNumber} />
          <NumberButton value={"x"} onClick={() => {}} />
        </div>
        <div className="flex">
          <OperatorButton
            symbol={"×"}
            onClick={handleClickOperator}
          ></OperatorButton>
          <OperatorButton
            symbol={"÷"}
            onClick={handleClickOperator}
          ></OperatorButton>
          <OperatorButton
            symbol={"+"}
            onClick={handleClickOperator}
          ></OperatorButton>
          <OperatorButton
            symbol={"−"}
            onClick={handleClickOperator}
          ></OperatorButton>
          <OperatorButton
            symbol={"%"}
            onClick={handleClickOperator}
          ></OperatorButton>
          <OperatorButton
            symbol={"^"}
            onClick={handleClickOperator}
          ></OperatorButton>
          <OperatorButton
            symbol={"="}
            onClick={handleCalculationResult}
          ></OperatorButton>
        </div>
      </div>
    </div>
  );
};
