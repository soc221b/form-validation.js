import { required, unique, domain } from './rules'

export default {
  domains: {
    $iter: {
      value: {
        $rules: {
          required,
          domain,
          unique,
        },
        $errors: {
          required: () => 'Must be filled.',
          domain: () => 'Please input correct domain',
          unique: () => 'Must be unique.',
        },
      },
    },
  },
}
