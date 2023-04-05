import { useCallback } from "react";

import Button from "./Button";

interface WindowProps {
  onClose: () => void;
  onSubmit: () => void;
  disabled?: boolean;
  isOpen?: boolean;
  title: string;
  label: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
}

const Window: React.FC<WindowProps> = ({
  onClose,
  onSubmit,
  disabled,
  isOpen,
  title,
  label,
  body,
  footer,
}) => {
  const handleClose = useCallback(() => {
    if (disabled) return;
    onClose();
  }, [onClose, disabled]);

  const handleSubmit = useCallback(() => {
    if (disabled) return;
    onSubmit();
  }, [onSubmit, disabled]);

  if (isOpen == false) return null;

  return (
    <div
      className="
                justify-center 
                items-center 
                flex 
                overflow-x-hidden 
                overflow-y-auto 
                fixed 
                inset-0 
                z-50 
                outline-none 
                focus:outline-none
                bg-neutral-800
                bg-opacity-70
            "
    >
      {/*Main div*/}
      <div
        className="
                    relative
                    w-full
                    lg:w-3/6
                    my-6
                    mx-auto
                    lg:max-w-3xl
                    h-full
                    lg:h-auto
                "
      >
        {/*Content*/}
        <div
          className="
                        relative
                        bg-black
                        outline-none
                        focus:outline-none
                        flex 
                        flex-col 
                        h-full
                        lg:h-auto
                        border-0 
                        rounded-lg 
                        shadow-lg 
                        w-full
                    "
        >
          {/*Header*/}
          <div
            className="
                            flex
                            items-center
                            justify-between
                            p-10
                            rounded-t
                        "
          >
            <h3 className="text-xl font-semibold text-white">{title}</h3>
            <button
              className="
                                ml-auto
                                border-0
                                text-white
                                p-1
                                transition
                                hover:opacity-70
                            "
              onClick={handleClose}
            >
              X
            </button>
          </div>
          {/*Body*/}
          <div className="flex-auto relative p-10">{body}</div>
          {/*Footer*/}
          <div className="flex flex-col gap-3 p-10">
            <Button
              onClick={handleSubmit}
              disabled={disabled}
              label={label}
              fullWidth
              secondary
            />
            {footer}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Window;
