interface InputFieldProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  label?: string;
  placeholder?: string;
  type?: string;
  value?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  onChange,
  disabled,
  label,
  placeholder,
  type = "text",
  value,
}) => {
  return (
    <div className="w-full">
      {label && (
        <p className="text-2xl text-white font-semibold mb-2">{label}</p>
      )}
      <input
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
        type={type}
        value={value}
        className="
                    bg-black
                    text-lg
                    border-2
                    border-neutral-800
                    rounded-md
                    outline-none
                    text-white
                    w-full
                    p-6
                    focus:border-sky-500
                    focus:border-2
                    transition
                    disabled:bg-neutral-900
                    disabled:opacity-70
                    disabled:cursor-not-allowed
                "
      />
    </div>
  );
};

export default InputField;
