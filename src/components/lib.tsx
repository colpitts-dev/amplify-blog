interface IButton {
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit";
}

const Button: React.FC<IButton> = ({
  className,
  onClick,
  children,
  type = "button",
  ...props
}) => {
  return (
    <button
      className={`py-3 text-white bg-pink-500 px-7 ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

const Footer = () => {
  return (
    <footer className="fixed bottom-0 w-full p-16 text-center text-white bg-gray-800">
      (<span className="text-gray-400">ɔ</span>) made with{" "}
      <span className="text-pink-500">♥</span> colpitts
      <span className="text-gray-300">.dev</span>
    </footer>
  );
};
export { Button, Footer };
