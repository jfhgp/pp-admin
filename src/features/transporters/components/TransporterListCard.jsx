import React from "react";
import PropTypes from "prop-types";

import { Typography } from "@material-ui/core";
import StarRatingComponent from "react-star-rating-component";

/** Route Constants **/
import routes from "../../../constants/route-constants";
import { RestrictedLink } from "../../../utils/permissions.utils";
import features from "../../../constants/feature-constants";
import actions from "../../../constants/actions-constants";

const TransporterListCard = props => {
  const { item, route } = props;
  const name = item.firstName
    ? `${item.firstName} ${item.lastName}`
    : "Full Name";
  const picture =
    item.picture ||
    "https://img.icons8.com/color/1600/circled-user-male-skin-type-1-2.png";

  return (
    <div className="transporter-list-card">
      <RestrictedLink
        to={`${routes[route]}/${item._id}`}
        className="link-icon"
        featureAndAction={{
          feature: features[route],
          action: actions.read
        }}
      >
        <span className="fas fa-cog" />
      </RestrictedLink>
      <div className="user-box">
        <div>
          <div
            className={`${
              item.banned ? "banned" : item.active ? "active" : ""
            }`}
          >
            <img src={picture} alt={name} />
            {item.banned ? (
              <i className="fas fa-times" />
            ) : item.active ? (
              <i className="fas fa-check" />
            ) : null}
          </div>
          <Typography id="name" variant="body1" style={{ textAlign: "center" }}>
            {name}
          </Typography>
          <Typography id="name" variant="body1" style={{ textAlign: "center" }}>
            {item.mobile}
          </Typography>
        </div>
        {item.banned ? (
          <div>
            <p className="banned">BANNED</p>
          </div>
        ) : (
          <div>
            {item.active ? <p className="active">ACTIVE</p> : null}
            <StarRatingComponent
              name="user-rating"
              value={item.rating}
              editing={false}
              emptyStarColor="#bbb"
            />
          </div>
        )}
      </div>
    </div>
  );
};

TransporterListCard.defaultProps = {
  route: "transporters"
};

TransporterListCard.propTypes = {
  item: PropTypes.shape(),
  route: PropTypes.string
};

export default TransporterListCard;
