module.exports = {
  extends: [
    'stylelint-config-sass-guidelines',
    'stylelint-config-standard',
    'stylelint-config-recess-order',
    'stylelint-config-styled-components',
    'stylelint-config-prettier',
  ],
  rules: {
    'color-hex-length': 'long',
    // disabled due to styled-components will have upper case variable
    'value-keyword-case': null,
    'max-nesting-depth': 2,
    'selector-class-pattern': null,
    // disabled due to conflict with stylelint-config-recess-order
    'order/properties-alphabetical-order': null, // stylelint-config-sass-guidelines rule
  },
}
