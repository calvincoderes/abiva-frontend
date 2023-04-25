module.exports = {
  extends: ['standard', 'standard-react', 'plugin:react/recommended'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    }
  },
  globals: {
    $: true,
    localStorage: true,
    sessionStorage: true,
    atob: true,
    Blob: true,
    FormData: true,
    FileReader: true,
    alert: true,
    fetch: true
  }
}
