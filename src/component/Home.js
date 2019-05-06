import React, { Component } from "react";
import { PrimaryButton } from "office-ui-fabric-react/lib/Button";
import { Dropdown, IDropdownOption } from "office-ui-fabric-react/lib/Dropdown";
import ShowData from "./ShowData";
import axios from "axios";
import { Spinner, SpinnerType } from "office-ui-fabric-react/lib/Spinner";

const optionsDepartment = [
    { key: "HR", text: "HR" },
    { key: "ENGINEERING", text: "ENGINEERING" }
  ],
  optionsHR = [
    { key: 1, text: "1" },
    { key: 2, text: "2" },
    { key: 3, text: "3" },
    { key: 4, text: "4" },
    { key: 5, text: "5" }
  ],
  optionsEngineering = [
    { key: 6, text: "6" },
    { key: 7, text: "7" },
    { key: 8, text: "8" },
    { key: 9, text: "9" },
    { key: 10, text: "10" }
  ];
const dropdownStyles = {
  dropdown: { width: 300 }
};

class Home extends Component {
  state = {
    selectedDepartment: "",
    selectedId: "",
    isCleared: false,
    isLoading: false,
    data: {}
  };
  _onDepartmentChange = (event, item) => {
    this.setState({
      selectedDepartment: item
    });
  };
  _onIdChange = (event, item) => {
    this.setState({
      selectedId: item
    });
  };
  _onClear = () => {
    this.setState({
      isCleared: !this.state.isCleared
    });
    window.location.reload();
  };
  getDetails = () => {
    this.setState({ isLoading: true });
    let myUrl = `https://reqres.in/api/users/${this.state.selectedId.key}`;
    axios
      .get(myUrl)
      .then(response => {
        this.setState({ data: response.data, isLoading: false });
      })
      .catch(err => {
        this.setState({ data: err, isLoading: false });
      });
  };
  render() {
    return (
      <div>
        <div className="homeComponent">
          <Dropdown
            label="Departments:"
            options={optionsDepartment}
            onChange={this._onDepartmentChange}
            placeholder="Select a Department"
            styles={dropdownStyles}
          />
          <Dropdown
            label="Employee ID:"
            options={
              this.state.selectedDepartment.key === "HR"
                ? optionsHR
                : (this.state.selectedDepartment.key === "ENGINEERING" ? optionsEngineering : [])
            }
            onChange={this._onIdChange}
            placeholder="Select Employee Id"
            styles={dropdownStyles}
          />
          <div className="homeButtons">
            <PrimaryButton
              disabled={!this.state.selectedDepartment}
              onClick={this.getDetails}
            >
              Get Details
            </PrimaryButton>
            <PrimaryButton
              disabled={!this.state.selectedDepartment}
              onClick={this._onClear}
            >
              Clear
            </PrimaryButton>
          </div>
        </div>
        <div className="showDataContainer">
          {this.state.isLoading ? (
            <Spinner type={SpinnerType.large} label=" loading..." />
          ) : (
            this.state.data.data ? <ShowData myData={this.state.data}/> : <p>{this.state.data.toString().includes("Error") && ` Something went wrong ${this.state.data}`}</p>
          )}
        </div>
      </div>
    );
  }
}

export default Home;
