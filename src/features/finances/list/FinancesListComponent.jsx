import React from "react";
import PropTypes from "prop-types";

import {
  Typography,
  InputBase,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Checkbox
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import Breadcrumbs from "@material-ui/lab/Breadcrumbs";
import moment from "moment";

import Page from "../../../components/layout/Page";
import EmptyRow from "../../../components/table/EmptyRow";
import { getNewColors, getFinancesColors } from "../../../utils/functions";

/**
 * Material UI Styles
 */
const styles = theme => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "#fff",
    marginLeft: 0,
    width: "100%",
    border: "1px solid #ccc"
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit",
    width: "100%"
  },
  inputInput: {
    padding: theme.spacing.unit,
    width: "100%",
    color: "#333"
  }
});
/* ********************************** */

const FinancesListComponent = props => {
  const { activity, classes, finances } = props;

  return (
    <Page
      activity={activity}
      className="dashboard-div layout-page"
      activityStyle={{ margin: "0 1rem" }}
      style={{}}
    >
      <div className="p-grid finances-list-container">
        <div className="p-col-12">
          <Typography variant="h5">Finances</Typography>
        </div>
        <div className="p-col-12">
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="Breadcrumb"
          >
            <div>Dashboard</div>
            <div style={{ color: getNewColors("secondary") }}>Finances</div>
          </Breadcrumbs>
        </div>
        <div className="p-col-12">
          <div className="p-grid p-justify-end">
            <div className="p-col-12 p-md-3">
              <div className={classes.search}>
                <InputBase
                  // value={props.search}
                  // onChange={props.handleChange}
                  disabled={activity}
                  name="search"
                  placeholder="Search"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput
                  }}
                />
              </div>
            </div>
            <div className="p-col-12">
              <div>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <Checkbox className="f-l-check-box" checked={false} />
                      </TableCell>
                      <TableCell>IBAN</TableCell>
                      <TableCell>Transporter</TableCell>
                      <TableCell>Last Paid Date</TableCell>
                      <TableCell>Last Paid Amount</TableCell>
                      <TableCell>Amount</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {finances.length ? (
                      finances.map(item => {
                        const transporter = item.transporter || {};
                        const bankInfo = transporter.bankInfo || {};
                        return (
                          <TableRow
                            key={item._id}
                            onClick={() => props.handleClick(item._id)}
                            style={{ cursor: "pointer" }}
                          >
                            <TableCell>
                              <Checkbox
                                className="f-l-check-box"
                                checked={false}
                              />
                            </TableCell>
                            <TableCell>{bankInfo.iban}</TableCell>
                            <TableCell>
                              {transporter.firstName} {transporter.lastName}
                            </TableCell>
                            <TableCell style={{ width: 140 }}>
                              {item.lastPaidDate
                                ? moment(item.lastPaidDate).format("DD MMM, YY")
                                : "-"}
                            </TableCell>
                            <TableCell>
                              {(transporter.config || {}).currency}
                              {item.lastPaidAmount}
                            </TableCell>
                            <TableCell style={{ fontWeight: "bold" }}>
                              {(transporter.config || {}).currency}{" "}
                              {item.amount}
                            </TableCell>
                            <TableCell>
                              <span
                                style={{
                                  backgroundColor: getFinancesColors(
                                    item.status
                                  )
                                }}
                              >
                                {item.status}
                              </span>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    ) : (
                      <EmptyRow colSpan={7} message="No finances found." />
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
};

FinancesListComponent.defaultProps = {
  finances: []
};

FinancesListComponent.propTypes = {
  finances: PropTypes.arrayOf(PropTypes.shape()),
  activity: PropTypes.bool,
  classes: PropTypes.shape(),
  handleClick: PropTypes.func
};

export default withStyles(styles)(FinancesListComponent);
