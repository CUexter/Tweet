class AccountInfo {
  id: string;
  name: string;
  tagName: string;
  password: string;
  email: string;
  verified: boolean;

  constructor(
    id: string,
    name: string,
    tagName: string,
    password: string,
    email: string,
    verified: boolean
  ) {
    this.id = id;
    this.name = name;
    this.tagName = tagName;
    this.password = password;
    this.email = email;
    this.verified = verified;
  }
}
export { AccountInfo };
