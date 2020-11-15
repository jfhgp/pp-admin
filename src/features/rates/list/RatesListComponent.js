import React from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import EuroSymbol from '@material-ui/icons/EuroSymbol';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';

import RatesAddContainer from '../add/RatesAddContainer';
import RatesUpdateContainer from '../update/RatesUpdateContainer';
import Page from '../../../components/layout/Page';
import { capitalize } from '../../../utils/functions';

const RatesListComponent = props => {
  const { rates, activity, visible, onChange, setModalData, hideModal } = props;
  const { Comp, data, setRatesFunc } = props.currentData;

  return (
    <Page activity={activity}>
      <Dialog
        visible={visible}
        showHeader={false}
        style={{ width: '90vw' }}
        modal={true}
        onHide={() => onChange('visible', false)}
      >
        {Comp && (
          <Comp
            data={data}
            rates={rates}
            setRates={setRatesFunc}
            hideModal={hideModal}
          />
        )}
      </Dialog>
      <div className="p-grid p-align-center">
        <div className="p-col-12 justify-between">
          <Typography variant="h5">Manage Rates</Typography>
          <Button
            label="Add Rate"
            disabled={activity}
            onClick={() => setModalData(true, RatesAddContainer, {})}
          />
        </div>
        {rates.map(item => (
          <div key={item._id} className="p-col-12 p-xs-12 p-sm-4">
            <Card>
              <div className="rates-list-card">
                <div>
                  <EuroSymbol />
                  <span>{item.price}</span>
                </div>
                <div className="label-div">
                  <span>For</span>
                  <span>{item.customer ? 'Customer' : 'Transporter'}</span>
                </div>
                <div className="label-div">
                  <span>Mode</span>
                  <span>{capitalize(item.mode)}</span>
                </div>
                <div className="label-div">
                  <span>Type</span>
                  <span>{capitalize(item.type)}</span>
                </div>
                <div id="border-div" className="label-div">
                  <span>Peak Factor</span>
                  <span>{item.peakFactor}</span>
                </div>
                <div className="rates-list-min-max-container">
                  <span>Weight</span>
                  <div>
                    <div />
                    <span>{item.minWeight} kg</span>
                    <span>{item.maxWeight} kg</span>
                  </div>
                </div>
                <div className="rates-list-min-max-container">
                  <span>Distance</span>
                  <div>
                    <div />
                    <span>{item.minDistance} mi</span>
                    <span>{item.maxDistance} mi</span>
                  </div>
                </div>
                <div className="rates-list-min-max-container">
                  <span>Width</span>
                  <div>
                    <div />
                    <span>{item.minWidth} m</span>
                    <span>{item.maxWidth} m</span>
                  </div>
                </div>
                <div className="rates-list-min-max-container">
                  <span>Height</span>
                  <div>
                    <div />
                    <span>{item.minHeight} m</span>
                    <span>{item.maxHeight} m</span>
                  </div>
                </div>
                <div className="rates-list-min-max-container">
                  <span>Length</span>
                  <div>
                    <div />
                    <span>{item.minLength} m</span>
                    <span>{item.maxLength} m</span>
                  </div>
                </div>
                <div className="text-right" style={{ marginTop: 20 }}>
                  <Button
                    label="UPDATE"
                    className="p-button-secondary"
                    style={{ backgroundColor: '#dcdccd' }}
                    onClick={() =>
                      setModalData(true, RatesUpdateContainer, item)
                    }
                  />
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </Page>
  );
};

RatesListComponent.propTypes = {
  rates: PropTypes.arrayOf(PropTypes.object),
  activity: PropTypes.bool,
  visible: PropTypes.bool,
  onChange: PropTypes.func,
  hideModal: PropTypes.func,
  setModalData: PropTypes.func,
  currentData: PropTypes.shape({
    Comp: PropTypes.func,
    data: PropTypes.shape()
  })
};

export default RatesListComponent;
