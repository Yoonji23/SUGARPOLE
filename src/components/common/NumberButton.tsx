interface NumberProps {
  value: string;
  onClick: (num: string) => void;
}
export const NumberButton = ({ value, onClick }: NumberProps) => {
  return (
    <div
      className="bg-[#404258] w-[65px] h-[45px] rounded-[35px] flex items-center
        justify-center font-inter text-[24px] text-white text-center"
      onClick={() => onClick(value)}
    >
      {value === "x" ? (
        <img src="/delete.png" alt="img" width={33} height={24} />
      ) : (
        value
      )}
    </div>
  );
};
