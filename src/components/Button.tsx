interface ButtonProps {
  onClick: () => void;
  disabled?: boolean;
  label: string;
  outline?: boolean;
  fullWidth?: boolean;
  large?: boolean;
  secondary?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  disabled,
  label,
  outline,
  fullWidth,
  large,
  secondary,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
            closed:opacity-70
                closed:cursor-not-allowed
                rounded-full
                font-semibold
                hover:opcacity-80
                transition
                border-2
                ${outline ? "bg-transparent" : ""}
                ${outline ? "border-white" : ""}
                ${outline ? "text-white" : ""}
                ${fullWidth ? "w-full" : "w-fit"}
                ${large ? "text-xl" : "text-md"}
                ${large ? "px-5" : "px-4"}
                ${large ? "py-3" : "py-2"}
                ${secondary ? "bg-white" : "bg-sky-500"}
                ${secondary ? "text-black" : "text-white"}
                ${secondary ? "border-black" : "border-sky-500"}
            `}
    >
      {label}
    </button>
  );
};

export default Button;
