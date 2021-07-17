import "./Image.css";

import { Avatar, IconButton, Modal } from "@material-ui/core";

import React from "react";
const FleetViewer = () => {
  const [open, setOpen] = React.useState(!false);
  return (
    <Modal open={open} onClose={() => setOpen(false)} className="fleet__viewer">
      <p>Fleets</p>
    </Modal>
  );
};

export default FleetViewer;
