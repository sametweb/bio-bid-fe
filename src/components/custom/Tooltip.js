import { withStyles } from "@material-ui/core";
import { Tooltip as TT } from "@material-ui/core";

const Tooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 12,
    fontWeight: 400,
  },
}))(TT);

export default Tooltip;
