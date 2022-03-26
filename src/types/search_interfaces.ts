export interface SearchProps {
  options: Array<Name>;
}

export interface Name {
  id: string;
  name: string;
}

export interface HandleInputProps {
  target: {
    value: string;
  };
}
