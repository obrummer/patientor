import React from "react";
import { Entry } from "../types";
import HealthCheck from "./HealthCheck";
import Occupational from "./Occupational";
import Hospital from "./Hospital";

interface Props {
  entry: Entry;
}

const PatientEntry = ({ entry }: Props) => {
  switch (entry.type) {
    case "Hospital":
      return <Hospital entry={entry} />;
    case "OccupationalHealthcare":
      return <Occupational entry={entry} />;
    case "HealthCheck":
      return <HealthCheck entry={entry} />;
  }
};

export default PatientEntry;
