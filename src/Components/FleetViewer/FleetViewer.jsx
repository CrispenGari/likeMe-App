import "./FleetViewer.css";
import { Modal } from "@material-ui/core";
import Input from "./Input/Input";
import Center from "./Center/Center";
import Header from "./Header/Header";
import React from "react";
const FleetViewer = () => {
  const [open, setOpen] = React.useState(!false);
  return (
    <Modal
      open={open}
      // onClose={() => setOpen(false)}
      className="fleet__viewer"
    >
      <div className="fleet__viewer__container">
        <div className="fleet__viewer__header">
          <Header />
        </div>
        <div className="fleet__viewer__center">
          <Center />
        </div>
        <div className="fleet__viewer__bottom">
          <Input />
        </div>
      </div>
    </Modal>
  );
};

export default FleetViewer;
