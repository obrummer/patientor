import React from "react";
import { OccupationalHealthcareEntry } from "../types";
import { Segment, Icon } from "semantic-ui-react";

interface Props {
  entry: OccupationalHealthcareEntry;
}

const Occupational = ({ entry }: Props) => {
  return (
    <Segment>
      <h5>
        {entry.date} <Icon name={"stethoscope"} size="large" />{" "}
        {entry.employerName}
      </h5>
      <p>{entry.description}</p>
    </Segment>
  );
};

export default Occupational;
