// React
import { useEffect, useState } from 'react';

// Styles
import * as S from './GestantesForm.styles';

// Models
import { GestantesFormProps } from './models';
import { IGestantes } from 'models';

// Formik
import { ErrorMessage, FormikProvider, useFormik } from 'formik';

// Components
import { Button } from 'components/button';
import { Input } from 'components/input';

// Hooks
import useValidationSchema from 'hooks/useValidationSchema';

const GestantesForm = ({ data, setData, onClose }: GestantesFormProps) => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleCloseModal = () => {
    onClose();
  };

  const initialValues: IGestantes = {
    name: '',
    email: '',
    phone: '',
  };

  const formik = useFormik({
    validationSchema: useValidationSchema(),
    initialValues,
    validateOnBlur: true,
    enableReinitialize: true,
    onSubmit: () => { },
  });

  useEffect(() => {
    if (!formik.values) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, []);

  const onFinish = async () => {
    try {
      setIsLoading(true);
      const newItem = {
        id: data.length + 1,
        ddp: "",
        user: formik.values.name,
        phone: formik.values.phone,
        obstetra: '',
        monitoring: 0,
        created_at: '',
        activity: '',
        image: null
      };

      setData([...data, newItem]);
    } catch (error: any) {
      console.log(error);
    } finally {
      setIsLoading(false);
      handleCloseModal();
    }
  };

  return (
    <S.Container>
      <h2>Adicionar</h2>
      <FormikProvider value={formik}>
        <div className='form_itens'>
          <div className="form-input">
            <ErrorMessage className="err" name="name" component="div" />
            <Input
              key="input-name"
              id="name"
              title="Nome"
              type="text"
              placeholder="Escreva aqui..."
              data-testid="name"
              onChange={formik.handleChange('name')}
              onBlur={formik.handleBlur('name')}
              value={formik.values.name}
              autocomplete="current-name"
            />
          </div>
          <div className="form-input">
            <ErrorMessage className="err" name="email" component="div" />
            <Input
              key="input-email"
              id="email"
              title="Email"
              type="text"
              placeholder="Escreva aqui..."
              data-testid="email"
              onChange={formik.handleChange('email')}
              onBlur={formik.handleBlur('email')}
              value={formik.values.email}
              autocomplete="current-email"
            />
          </div>
          <div className="form-input">
            <ErrorMessage className="err" name="phone" component="div" />
            <Input
              key="input-phone"
              id="phone"
              title="Telefone"
              type="text"
              mask="(99) 9999-9999"
              placeholder="Escreva aqui..."
              data-testid="phone"
              onChange={formik.handleChange('phone')}
              onBlur={formik.handleBlur('phone')}
              value={formik.values.phone}
              autocomplete="current-phone"
            />
          </div>
          <div className="form-input">
            <Input
              key="input-phone"
              id="phone"
              title="Data de nascimento"
              type="text"
              mask="(99) 9999-9999"
              placeholder="Escreva aqui..."
              data-testid="phone"
              onChange={formik.handleChange('phone')}
              onBlur={formik.handleBlur('phone')}
              value={formik.values.phone}
              autocomplete="current-phone"
            />
          </div>
          <div className="form-input">
            <Input
              key="input-phone"
              id="phone"
              title="Dum"
              type="text"
              mask="(99) 9999-9999"
              placeholder="Escreva aqui..."
              data-testid="phone"
              onChange={formik.handleChange('phone')}
              onBlur={formik.handleBlur('phone')}
              value={formik.values.phone}
              autocomplete="current-phone"
            />
          </div>
          <div className="form-input">
            <Input
              key="input-phone"
              id="phone"
              title="Gestações prévias"
              type="text"
              mask="(99) 9999-9999"
              placeholder="Escreva aqui..."
              data-testid="phone"
              onChange={formik.handleChange('phone')}
              onBlur={formik.handleBlur('phone')}
              value={formik.values.phone}
              autocomplete="current-phone"
            />
          </div>
          <div className="form-input">
            <Input
              key="input-phone"
              id="phone"
              title="Partos prévios"
              type="text"
              mask="(99) 9999-9999"
              placeholder="Escreva aqui..."
              data-testid="phone"
              onChange={formik.handleChange('phone')}
              onBlur={formik.handleBlur('phone')}
              value={formik.values.phone}
              autocomplete="current-phone"
            />
          </div>
          <div className="form-input">
            <Input
              key="input-phone"
              id="phone"
              title="Risco"
              type="text"
              mask="(99) 9999-9999"
              placeholder="Escreva aqui..."
              data-testid="phone"
              onChange={formik.handleChange('phone')}
              onBlur={formik.handleBlur('phone')}
              value={formik.values.phone}
              autocomplete="current-phone"
            />
          </div>
          <div className="form-input">
            <Input
              key="input-phone"
              id="phone"
              title="Risco"
              type="text"
              mask="(99) 9999-9999"
              placeholder="Escreva aqui..."
              data-testid="phone"
              onChange={formik.handleChange('phone')}
              onBlur={formik.handleBlur('phone')}
              value={formik.values.phone}
              autocomplete="current-phone"
            />
          </div>
        </div>

        <div className="actions">
          <Button label="Cancel" type="primary" onClick={handleCloseModal} />
          <Button
            label="Salvar e enviar senha"
            disabled={isDisabled}
            loading={isLoading}
            type="secondary"
            onClick={onFinish}
          />
        </div>
      </FormikProvider>
    </S.Container>
  );
};

export default GestantesForm;
