import React, { Component } from "react";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import { Card } from "primereact/card";

export class Insurance extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      city: null,
      dataTableValue: [
        {
          date: "02-Jan-2019",
          item: "Mobile Phone",
          amount: "$140",
          description: "Mobile phone was broken while being delivered"
        },
        {
          date: "02-Jan-2019",
          item: "Mobile Phone",
          amount: "$140",
          description: "Mobile phone was broken while being delivered"
        },
        {
          date: "02-Jan-2019",
          item: "Mobile Phone",
          amount: "$140",
          description: "Mobile phone was broken while being delivered"
        },
        {
          date: "02-Jan-2019",
          item: "Mobile Phone",
          amount: "$140",
          description: "Mobile phone was broken while being delivered"
        },
        {
          date: "02-Jan-2019",
          item: "Mobile Phone",
          amount: "$140",
          description: "Mobile phone was broken while being delivered"
        }
      ]
    };

    this.onCityChange = this.onCityChange.bind(this);
  }

  onCityChange(e) {
    this.setState({ city: e.value });
  }

  componentDidMount() {}

  render() {
    let cities = [
      { label: "New York", value: { id: 1, name: "New York", code: "NY" } },
      { label: "Rome", value: { id: 2, name: "Rome", code: "RM" } },
      { label: "London", value: { id: 3, name: "London", code: "LDN" } },
      { label: "Istanbul", value: { id: 4, name: "Istanbul", code: "IST" } },
      { label: "Paris", value: { id: 5, name: "Paris", code: "PRS" } }
    ];

    const dialogFooter = (
      <div>
        <Button
          icon="pi pi-plus"
          onClick={() => this.setState({ display: false })}
          type="button"
          label="Add"
        />
      </div>
    );

    return (
      <Card>
        <div
          style={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column"
          }}
        >
          <Dialog
            header="Add an insurance record"
            visible={this.state.display}
            modal={true}
            width="40%"
            footer={dialogFooter}
            onHide={() => this.setState({ display: false })}
          >
            <div className="p-grid">
              <div className="p-col-12">
                <Dropdown
                  value={this.state.city}
                  options={cities}
                  placeholder="Select a City"
                  onChange={this.onCityChange}
                  autoWidth={false}
                />
              </div>
              <div className="p-col-12">
                <InputText type="text" placeholder="Item" />
              </div>
              <div className="p-col-12">
                <InputText type="text" placeholder="Amount" />
              </div>
              <div className="p-col-12">
                <InputTextarea
                  rows={3}
                  cols={30}
                  placeholder="Description"
                  autoResize={true}
                />
              </div>
            </div>
          </Dialog>
          <Button
            style={{ width: "30%" }}
            icon="pi pi-plus"
            label="Add Record"
            onClick={() => this.setState({ display: true })}
          />

          <div className="p-col-12">
            <div className="card card-w-title">
              <h1>Insruance Records</h1>
              <DataTable
                value={this.state.dataTableValue}
                paginatorPosition="both"
                selectionMode="single"
                header="Insurance Records"
                paginator={true}
                rows={10}
                responsive={true}
                selection={this.state.dataTableSelection}
                onSelectionChange={event =>
                  this.setState({ dataTableSelection: event.data })
                }
              >
                <Column field="date" header="Date" sortable={true} />
                <Column field="item" header="Item/Order" sortable={true} />
                <Column field="amount" header="Amount" sortable={true} />
                <Column
                  field="description"
                  header="Description"
                  sortable={true}
                />
              </DataTable>
            </div>
          </div>
        </div>
      </Card>
    );
  }
}
