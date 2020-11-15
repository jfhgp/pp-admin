import React from "react";
import PropTypes from "prop-types";
import ChatComponent from "../chat/ChatComponent";
import {
  Typography,
  InputBase,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Checkbox,
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
const styles = (theme) => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "#fff",
    marginLeft: 0,
    width: "100%",
    border: "1px solid #ccc",
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
    width: "100%",
  },
  inputInput: {
    padding: theme.spacing.unit,
    width: "100%",
    color: "#333",
  },
});
/* ********************************** */

const CustomerSupportListComponent = (props) => {
  const { activity, renderListUser } = props;

  return (
    <Page
      activity={activity}
      className="dashboard-div layout-page"
      activityStyle={{ margin: "0 1rem" }}
      style={{}}
    >
      <div className="p-grid finances-list-container">
        <div className="p-col-12">
          <Typography variant="h5">Customer Support</Typography>
        </div>
        <div className="p-col-12">
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="Breadcrumb"
          >
            <div>Dashboard</div>
            <div style={{ color: getNewColors("secondary") }}>
              Customer Support
            </div>
          </Breadcrumbs>
        </div>
        <div className="body">
          <div className="viewListUser"> {renderListUser()}</div>
          {/* <div className="viewBoard">
            {this.state.currentPeerUser ? (
              <ChatBoard
                currentPeerUser={this.state.currentPeerUser}
                showToast={this.props.showToast}
              />
            ) : (
                <WelcomeBoard
                  currentUserNickname={this.currentUserNickname}
                  currentUserAvatar={this.currentUserAvatar}
                />
              )}
          </div> */}
        </div>
      </div>
      <ChatComponent
        {...props}
        // user={props.user}
        // showChat={props.showChat}
        // messages={props.messages}
        // onClick={props.handleToggleChat}
        sendMessage={props.handleSendMessage}
        canSendMessage={true}
      />
    </Page>
  );
};

CustomerSupportListComponent.defaultProps = {
  finances: [],
};

CustomerSupportListComponent.propTypes = {
  finances: PropTypes.arrayOf(PropTypes.shape()),
  activity: PropTypes.bool,
  classes: PropTypes.shape(),
  handleClick: PropTypes.func,
};

export default withStyles(styles)(CustomerSupportListComponent);
