import React from "react";
import { HealthCheckEntry } from "../types";
import { Segment, Icon } from "semantic-ui-react";

interface Props {
  entry: HealthCheckEntry;
}

type HeartColour = "green" | "yellow" | "orange" | "red" | undefined;

const HealthCheck = ({ entry }: Props) => {
  const chooseColour = (): HeartColour => {
    switch (entry.healthCheckRating) {
      case 0:
        return "green";
      case 1:
        return "yellow";
      case 2:
        return "orange";
      case 3:
        return "red";
    }
  };

  return (
    <Segment>
      <h5>
        {entry.date} <Icon name={"doctor"} size="large" />
      </h5>
      <p>{entry.description}</p>
      <Icon name={"heart"} size="large" color={chooseColour()} />
    </Segment>
  );
};

export default HealthCheck;
