import React, {useState} from 'react';
import {Control, Controller, FormState} from 'react-hook-form';
import {KeyboardTypeOptions, StyleSheet, View} from 'react-native';
import {HelperText, TextInput} from 'react-native-paper';

export type FormInputProps = {
  state: FormState<any>;
  control: Control<any, any>;
  name: string;
  icon?: string;
  placeholder?: string;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  testID?: string;
};

/**
 * Generic component for rendering a form inputs
 * @param props the props
 * @see {@link FormInputProps}
 * @see {@link TextInput}
 */
const FormInput: React.FC<FormInputProps> = (props) => {
  const [secured, setSecured] = useState<boolean>(
    props.secureTextEntry || false,
  );
  const {errors} = props.state;
  const hasErrors = errors[props.name] !== undefined;
  return (
    <Controller
      control={props.control}
      name={props.name}
      defaultValue={null}
      render={({field: {onChange, onBlur, value}}) => (
        <View style={styles.inputWrapper}>
          <TextInput
            testID={props.testID}
            mode="outlined"
            theme={{roundness: 15}}
            left={props.icon ? <TextInput.Icon icon={props.icon} /> : undefined}
            right={
              props.secureTextEntry ? (
                <TextInput.Icon
                  icon={secured ? 'eye' : 'eye-off'}
                  onPress={() => setSecured(!secured)}
                />
              ) : undefined
            }
            placeholder={props.placeholder}
            keyboardType={props.keyboardType}
            autoCapitalize={props.autoCapitalize}
            returnKeyType="next"
            secureTextEntry={secured}
            error={hasErrors}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
          />
          <HelperText type="error" visible={hasErrors}>
            {hasErrors && (errors[props.name]!.message as string)}
          </HelperText>
        </View>
      )}
    />
  );
};

FormInput.defaultProps = {
  keyboardType: 'default',
  autoCapitalize: 'none',
  secureTextEntry: false,
};

const styles = StyleSheet.create({
  inputWrapper: {
    marginTop: 5,
  },
});

export default FormInput;
