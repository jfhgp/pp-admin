import React from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';
import { Typography, Button, Dialog } from '@material-ui/core';
import Remove from '@material-ui/icons/Remove';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Breadcrumbs from '@material-ui/lab/Breadcrumbs';

import Page from '../../../components/layout/Page';
import PromotionsAddContainer from '../add/PromotionsAddContainer';
import PromotionsUpdateContainer from '../update/PromotionsUpdateContainer';
import PromotionsExpireContainer from '../expire/PromotionsExpireContainer';
import EmptyDataPlaceholder from '../../../components/layout/EmptyDataPlaceholder';
import { getNewColors } from '../../../utils/functions';

const PromotionsListComponent = props => {
  const {
    activity,
    promotions,
    isDialogVisible,
    dialogData: { comp: Comp, data },
    handleDialogVisibility,
    handleSetPromotions
  } = props;

  return (
    <Page
      activity={activity}
      className="dashboard-div layout-page"
      activityStyle={{ margin: '0 1rem' }}
      style={{}}
    >
      <div className="p-grid" style={{ margin: 0, padding: '0 1rem' }}>
        <div className="p-col-12">
          <Typography variant="h5">Promotions</Typography>
        </div>
        <div className="p-col-12">
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="Breadcrumb"
          >
            <div>Dashboard</div>
            <div style={{ color: getNewColors('secondary') }}>Promotions</div>
          </Breadcrumbs>
        </div>
        <div className="p-col-12 text-right">
          <Button
            variant="contained"
            disabled={activity}
            onClick={() =>
              handleDialogVisibility(true, PromotionsAddContainer, {})
            }
          >
            Add Promotion
          </Button>
        </div>
        {promotions.length ? (
          promotions.map(item => {
            const isExpired = item.expired || moment().isAfter(item.validTill);
            return (
              <div
                key={item._id}
                className="p-col-8 p-md-3 p-lg-3 p-xl-3 p-offset-2 p-sm-offset-0"
                style={{ padding: 10 }}
              >
                <div
                  className="promotions-card-container"
                  style={
                    isExpired
                      ? {
                          boxShadow: 'unset',
                          border: '1px solid #dcdcdc',
                          backgroundColor: '#efefef'
                        }
                      : {}
                  }
                >
                  {!isExpired && (
                    <button
                      onClick={() =>
                        handleDialogVisibility(
                          true,
                          PromotionsExpireContainer,
                          item
                        )
                      }
                    >
                      <Remove />
                    </button>
                  )}
                  <div id="valid-till">
                    <div>
                      <p>Valid Till</p>
                      <p>{moment(item.validTill).format('DD MMM, YY')}</p>
                    </div>
                  </div>
                  <div id="discount">{item.discount}%</div>
                  <div id="code">
                    <span>{item.code.toUpperCase()}</span>
                  </div>
                  <div id="details">
                    <div id="text">
                      <Typography
                        variant="body1"
                        style={{ fontStyle: 'italic' }}
                      >
                        {item.text}
                      </Typography>
                    </div>
                    <div className="misc-details">
                      <Typography variant="body1">From</Typography>
                      <Typography variant="body1">
                        {moment(item.validFrom).format('DD MMM,  YY')}
                      </Typography>
                    </div>
                    <div className="misc-details">
                      <Typography variant="body1">Max Discount</Typography>
                      <Typography
                        variant="body1"
                        style={{ fontWeight: 'bold' }}
                      >
                        {item.maxDiscount} &euro;
                      </Typography>
                    </div>
                  </div>
                  {!isExpired && (
                    <div id="update-btn">
                      <Button
                        disabled={activity}
                        onClick={() =>
                          handleDialogVisibility(
                            true,
                            PromotionsUpdateContainer,
                            item
                          )
                        }
                      >
                        Update
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="p-col-12">
            <EmptyDataPlaceholder message="No promotions found." />
          </div>
        )}
      </div>
      <Dialog
        open={isDialogVisible}
        onClose={handleDialogVisibility}
        maxWidth="md"
      >
        {Comp && (
          <Comp
            promotions={promotions}
            setPromosFunc={handleSetPromotions}
            closeDialog={handleDialogVisibility}
            data={data}
            dialogVisible={isDialogVisible}
          />
        )}
      </Dialog>
    </Page>
  );
};

PromotionsListComponent.defaultProps = {
  dialogData: { comp: () => null, data: {} }
};

PromotionsListComponent.propTypes = {
  activity: PropTypes.bool,
  promotions: PropTypes.arrayOf(PropTypes.object),
  isDialogVisible: PropTypes.bool,
  dialogData: PropTypes.shape({
    Comp: PropTypes.func,
    data: PropTypes.shape()
  }),
  handleDialogData: PropTypes.func,
  handleDialogVisibility: PropTypes.func,
  handleSetPromotions: PropTypes.func
};

export default PromotionsListComponent;
