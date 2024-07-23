interface OperatorProps {
  symbol: string;
  onClick: (symbol: string) => void;
}

export const OperatorButton = ({ symbol, onClick }: OperatorProps) => {
  return (
    <div
      className={
        symbol === "="
          ? "w-full h-[45px] rounded-full flex items-center justify-center bg-[#B2B2B2] text-black col-span-2"
          : "w-[45px] h-[45px] rounded-full flex items-center justify-center  bg-[#F49D1A] text-white"
      }
      onClick={() => onClick(symbol)}
    >
      <div>{symbol}</div>
    </div>
  );
};
