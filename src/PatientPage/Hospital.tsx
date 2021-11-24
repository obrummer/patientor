import React from "react";
import { HospitalEntry } from "../types";
import { Segment, Icon } from "semantic-ui-react";

interface Props {
  entry: HospitalEntry;
}

const Hospital = ({ entry }: Props) => {
  return (
    <Segment>
      <h5>
        {entry.date} <Icon name={"hospital"} size="large" />
      </h5>
      <p>{entry.description}</p>
    </Segment>
  );
};

export default Hospital;
