import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { useStateValue } from "../state";

import {
  TextField,
  NumberField,
  DiagnosisSelection,
} from "../AddPatientModal/FormField";
import { HealthCheckEntry, HealthCheckRating } from "../types";

export type EntryFormValues = Omit<HealthCheckEntry, "id">;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

export const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnosis }] = useStateValue();

  return (
    <Formik
      initialValues={{
        date: "",
        specialist: "",
        description: "",
        type: "HealthCheck",
        healthCheckRating: HealthCheckRating.LowRisk,
        diagnosisCodes: undefined,
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Diagnosis"
              name="diagnosisCodes"
              diagnoses={Object.values(diagnosis)}
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              component={DiagnosisSelection}
            />
            <Field
              placeholder="Health rating"
              name="healthCheckRating"
              min={0}
              max={3}
              component={NumberField}
            />
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
