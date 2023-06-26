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
  Center,
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useFormik, FormikHelpers } from 'formik';
import { getCricketStatById, updateCricketStatById } from 'apiSdk/cricket-stats';
import { Error } from 'components/error';
import { cricketStatValidationSchema } from 'validationSchema/cricket-stats';
import { CricketStatInterface } from 'interfaces/cricket-stat';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { AnalystInterface } from 'interfaces/analyst';
import { getAnalysts } from 'apiSdk/analysts';

function CricketStatEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<CricketStatInterface>(
    () => (id ? `/cricket-stats/${id}` : null),
    () => getCricketStatById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: CricketStatInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateCricketStatById(id, values);
      mutate(updated);
      resetForm();
      router.push('/cricket-stats');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<CricketStatInterface>({
    initialValues: data,
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
            Edit Cricket Stat
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {formError && (
          <Box mb={4}>
            <Error error={formError} />
          </Box>
        )}
        {isLoading || (!formik.values && !error) ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
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
        )}
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'cricket_stat',
  operation: AccessOperationEnum.UPDATE,
})(CricketStatEditPage);
