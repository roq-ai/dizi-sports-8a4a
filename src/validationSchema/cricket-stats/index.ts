import * as yup from 'yup';

export const cricketStatValidationSchema = yup.object().shape({
  stat: yup.string().required(),
  analyst_id: yup.string().nullable(),
});
