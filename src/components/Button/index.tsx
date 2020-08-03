import React, {CSSProperties} from "react";
import './button.css';

export const Button: React.FC<{style?: CSSProperties}> = props => {
  return (
    <button className="--acui-button">
      {props.children}
    </button>
  );
}
