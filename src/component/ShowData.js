import React, { Component } from "react";
import { Image } from "office-ui-fabric-react/lib/Image";
import { Label } from "office-ui-fabric-react/lib/Label";

class ShowData extends Component {
  render() {
    const { myData } = this.props;
    return (
      <div className="showData">
        <Image
          src={myData.data.avatar}
          alt={`image of ${myData.data.first_name}`}
          width={300}
          height={200}
        />
        <div className="empInfo">
          <Label>{"ID: " + myData.data.id}</Label>
          <Label>{"Name: " + myData.data.first_name + " " + myData.data.last_name}</Label>
        </div>
      </div>
    );
  }
}

export default ShowData;
