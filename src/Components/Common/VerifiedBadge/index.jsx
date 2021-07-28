import { HiBadgeCheck } from "react-icons/hi";

import "./VerifiedBadge.css";
const VerifiedBadge = ({ size, left }) => (
  <HiBadgeCheck
    className="verified__badge"
    style={
      size || left
        ? {
            fontSize: size ? size : 14,
            marginLeft: left ? left : 5,
          }
        : {}
    }
  />
);

export default VerifiedBadge;
