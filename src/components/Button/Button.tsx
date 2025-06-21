interface ButtonProps {
  onClick?: () => void;
  text: string;
  type: "submit" | "button";
}

export default function Button({ onClick, text, type }: ButtonProps) {
  return (
    <button type={type} onClick={onClick}>
      {text}
    </button>
  );
}
