import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createCricketStat } from 'apiSdk/cricket-stats';
import { Error } from 'components/error';
import { cricketStatValidationSchema } from 'validationSchema/cricket-stats';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { AnalystInterface } from 'interfaces/analyst';
import { getAnalysts } from 'apiSdk/analysts';
import { CricketStatInterface } from 'interfaces/cricket-stat';

function CricketStatCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: CricketStatInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createCricketStat(values);
      resetForm();
      router.push('/cricket-stats');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<CricketStatInterface>({
    initialValues: {
      stat: '',
      analyst_id: (router.query.analyst_id as string) ?? null,
    },
    validationSchema: cricketStatValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Cricket Stat
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="stat" mb="4" isInvalid={!!formik.errors?.stat}>
            <FormLabel>Stat</FormLabel>
            <Input type="text" name="stat" value={formik.values?.stat} onChange={formik.handleChange} />
            {formik.errors.stat && <FormErrorMessage>{formik.errors?.stat}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<AnalystInterface>
            formik={formik}
            name={'analyst_id'}
            label={'Select Analyst'}
            placeholder={'Select Analyst'}
            fetcher={getAnalysts}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.id}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'cricket_stat',
  operation: AccessOperationEnum.CREATE,
})(CricketStatCreatePage);
