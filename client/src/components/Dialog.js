import React from "react";

const Dialog = ({ children, isOpenDialog, onCloseDialog }) => {

  const dialogStyles = {
    width: "500px",
    maxWidth: "100%",
    margin: "0 auto",
    position: "fixed",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 9999,
    backgroundColor: "#fc7777",
    padding: "10px 20px 40px",
    borderRadius: "8px",
    display: "flex",
    flexDirection: "column",
  };

  const dialogCloseButtonStyles = {
    marginBottom: "15px",
    padding: "3px, 8px",
    cursor: "pointer",
    borderRadius: "50%",
    border: "none",
    width: "30px",
    height: "30px",
    fontWeight: "bold",
    alignSelf: "flex-end",
    backgroundColor: "#fc7777",
    color: "#f7f7f7"
  };

  let dialog = (
    <div style={dialogStyles}>
      <button style={dialogCloseButtonStyles} onClick={onCloseDialog}>x</button>
      <div className="text-light">
        {children}
      </div>
    </div>
  );

  if (!isOpenDialog) {
    dialog = null;
  };

  return (
    <div>
      {dialog}
    </div>
  );
};

export default Dialog;