import { Modal } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  modal: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    transition: "transition: width 2s;",
    borderRadius: "8px 8px 8px 8px",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: "50%",
    left: "50%",

    transform: "translate(-50%, -50%)",
    margin: theme.spacing(1),
  },
  iconos: {
    cursor: "pointer",
  },
  inputMaterial: {
    width: "100%",
  },
}));

const ModalAdd = ({ children, open, close }) => {
  const styles = useStyles();

  return (
    <Modal open={open} onClose={close}>
      <div className={styles.modal}>{children}</div>
    </Modal>
  );
};

export default ModalAdd;