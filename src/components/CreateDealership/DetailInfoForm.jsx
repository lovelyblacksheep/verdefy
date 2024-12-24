import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '8px',
  boxShadow: 24,
  p: 4,
  outline: 'none'
};

const buttonStyle = {
  marginTop: 2,
  display: 'flex',
  justifyContent: 'center',
};

const DetailInfoForm = ({ profitPercent }) => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (profitPercent === 0) {
      setOpen(true);
    }
  }, [profitPercent]);

  const handleButtonClick = () => {
    setOpen(false);
    navigate("/dealersetting");
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Detail
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="profit-percent"
            name="profit-percent"
            label="Profit Margin Percent (%)"
            fullWidth
            autoComplete="profit-percent"
            type="number"
            variant="standard"
            value={profitPercent}
            disabled
          />
        </Grid>
      </Grid>
      <Modal
        open={open}
        onClose={() => {}}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        disableBackdropClick
      >
        <Box sx={style}>
          <Typography id="modal-title" variant="h6" component="h2" align="center">
            Did you set the markup percent?
          </Typography>
          <Typography id="modal-description" sx={{ mt: 2 }} align="center">
            Please ensure you have set the markup percent.
          </Typography>
          <Box sx={buttonStyle}>
            <Button onClick={handleButtonClick} variant="contained">
              Go to Dealer Setting
            </Button>
          </Box>
        </Box>
      </Modal>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  profitPercent: state.profit.profitPercent,
});

export default connect(mapStateToProps)(DetailInfoForm);
