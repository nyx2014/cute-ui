import React, {CSSProperties} from "react";
import { ReactComponent as Shape } from "./shape.svg";
import './dialog.css';

export const Dialog: React.FC<{style?: CSSProperties}> = props => {
  return (
    <div className="dialog">
      <Shape />
      <div className="clipped" style={props.style}>
        <div className="wrapper">
          {props.children}
        </div>
      </div>
    </div>
  );
}
