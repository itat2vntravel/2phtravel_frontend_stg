import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { PulseLoader } from "react-spinners";

const ModalPopup = ({
  open,
  setopen,
  deletename,
  handleDelete,
  Note,
  loading,
}: any) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "white",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };
  return (
    <div>
      <div>
        <Modal
          open={open}
          onClose={() => setopen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Delete Confirmation
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Are you sure you want to delete {deletename} ?
            </Typography>
            <h6
              id="modal-modal-description"
              style={{
                marginTop: "12Px",
                textAlign: "start",
                fontSize: "14px",
                fontWeight: 500,
                opacity: 0.8,
              }}
            >
              This action cannot be undone.
            </h6>
            {Note && (
              <h3 style={{ fontSize: "12px", marginTop: "10px" }}>{Note}</h3>
            )}
            <div
              style={{
                display: "flex",
                justifyContent: "end",
                marginTop: "20px",
              }}
            >
              <button
                className="text-customWhite p-2  bg-customRed w-[90px] mr-[10px] rounded-[5px]"
                onClick={() => handleDelete()}
                disabled={loading ? true : false}
              >
                {loading ? <PulseLoader color="#fff" /> : "Yes"}
              </button>
              <button
                className="text-customBlue  w-[80px] rounded-[5px]"
                style={{
                  border: `0.5px solid #142D53 `,
                }}
                onClick={() => {
                  setopen(false);
                }}
              >
                No
              </button>
            </div>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default ModalPopup;
