import { Field, Form, Formik } from 'formik';
import { Grid, Button } from '@material-ui/core';
import {
  DiagnosisSelection,
  HealthCheckRatingOption,
  SelectField,
  TextField,
} from '../AddPatientModal/FormField';

import { useStateValue } from '../state';
import { EntryType, EntryWithoutId, HealthCheckRating } from '../types';
import { isDate } from '../util';

type Props = {
  onSubmit: (values: EntryWithoutId) => void;
  onCancel: () => void;
  initialValues: EntryWithoutId;
};

const healthCheckRatingOptions: HealthCheckRatingOption[] = [
  { value: HealthCheckRating.Healthy, label: 'Healthy' },
  { value: HealthCheckRating.LowRisk, label: 'LowRisk' },
  { value: HealthCheckRating.HighRisk, label: 'HighRisk' },
  { value: HealthCheckRating.CriticalRisk, label: 'CriticalRisk' },
];

const AddEntryForm: React.FC<Props> = ({
  onCancel,
  onSubmit,
  initialValues,
}) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = 'Field is required';
        const errors: Record<string, string> = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!isDate(values.date)) {
          errors.date = 'Not date';
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (values.type === EntryType.OccupationalHealthcare) {
          if (!values.employerName) {
            errors.employerName = requiredError;
          }
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
              label="Date"
              placeholder="Date"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />

            {initialValues.type === EntryType.HealthCheck && (
              <SelectField
                label="Health Rating"
                name="healthCheckRating"
                options={healthCheckRatingOptions}
              />
            )}
            {initialValues.type === EntryType.Hospital && (
              <>
                <Field
                  label="Discharge Date"
                  placeholder="Date"
                  name="discharge.date"
                  component={TextField}
                  validate={(v: string) => (!isDate(v) ? 'Not date' : '')}
                />
                <Field
                  label="Discharge Criteria"
                  placeholder="Criteria"
                  name="discharge.criteria"
                  component={TextField}
                  validate={(v: string) => (!v ? 'Field is required' : '')}
                />
              </>
            )}
            {initialValues.type === EntryType.OccupationalHealthcare && (
              <>
                <Field
                  label="Employer Name"
                  placeholder="Employer Name"
                  name="employerName"
                  component={TextField}
                />
                <Field
                  label="Sick leave Start Date"
                  placeholder="Start Date"
                  name="sickLeave.startDate"
                  component={TextField}
                />
                <Field
                  label="Sick leave End Date"
                  placeholder="End Date"
                  name="sickLeave.endDate"
                  component={TextField}
                />
              </>
            )}

            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />

            <Grid>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ float: 'left' }}
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    float: 'right',
                  }}
                  type="submit"
                  variant="contained"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
