export function useAuthField(fieldName: string) {
  function capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

  function formatName(name: string): string {
    const words: string[] = name.match(/[A-Za-z][a-z]*/g) || [];
    return words.map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  }

  function getInputType(name: string): string {
    if (name === 'email') {
      return 'email';
    }

    if (['password', 'confirmPassword'].includes(name)) {
      return 'password';
    }

    return 'text';
  }

  return {
    capitalizeFirstLetter,
    formatedName: formatName(fieldName),
    inputType: getInputType(fieldName),
  };
}
