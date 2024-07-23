import { useState, useEffect } from "react";
import { operations } from "../utils/operations";
import { NumberButton } from "./common/NumberButton";
import { OperatorButton } from "./common/OperatorButton";

const numberButtons = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  ".",
  "0",
  "x",
];

const operatorButtons = ["×", "÷", "+", "-", "%", "^", "="];

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
  /** 삭제 입력 함수 */
  const handleClickDelete = () => {
    setInput((prev) => prev.slice(0, -1));
  };
  /**계산 결과 함수 */
  const handleCalculationResult = (symbol: string) => {
    if (["+", "-", "×", "÷", "%", "^", "="].includes(symbol)) {
      try {
        //1. 0으로 나누는 경우 에러 처리
        if (operator === "÷" && parseFloat(input) === 0) {
          window.alert("Error: Cannot divide by zero");
          return;
        }

        if (previousValue && operator && input) {
          const operation = operations[operator];

          //2. 정의되지 않은 연산자 에러 처리
          if (typeof operation !== "function") {
            window.alert(`Operation for "${operator}" is not defined`);
          }
          const result = operations[operator](previousValue, parseFloat(input));
          //3. 무한대나 NaN 에러 처리
          if (!isFinite(result)) {
            window.alert("Result is not finite");
          } else if (isNaN(result)) {
            window.alert("Result is not a number");
          }

          setInput("");
          setUserInput(result.toString());
          setPreviousValue(result);
        }
      } catch (error) {
        window.alert(`Error: ${error}`);

        setInput("");
        setPreviousValue(null);
        setOperator(null);
        setUserInput("");
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
    <div className="flex flex-col w-[400px] h-[367px] bg-[#242530] p-[25px]">
      <div
        className="w-[350px] h-[70px]  rounded-[20px] flex items-center
        justify-center
         bg-[#3A3F77] pt-[18px] pb-[13px] "
      >
        <input
          className="flex w-[303px] text-white font-inter text-[32px] text-right mr-[16px] ml-[31px] pr-[10px] bg-[#3A3F77] "
          readOnly
          value={input || userInput}
        ></input>
      </div>

      <div className="flex flex-grow mt-[22px] gap-[23px] ">
        <div className="grid grid-cols-3 gap-[15px] flex-grow">
          {numberButtons.map((num: string) => {
            return (
              <div key={num}>
                <NumberButton
                  value={num}
                  onClick={num === "x" ? handleClickDelete : handleClickNumber}
                ></NumberButton>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-2 gap-[15px] flex-shrink-0">
          {operatorButtons.map((symbol) => (
            <OperatorButton
              key={symbol}
              symbol={symbol}
              onClick={
                symbol === "=" ? handleCalculationResult : handleClickOperator
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};
