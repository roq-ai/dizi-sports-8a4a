import * as yup from 'yup';

export const liveScoreValidationSchema = yup.object().shape({
  score: yup.number().integer().required(),
  organization_id: yup.string().nullable(),
});
