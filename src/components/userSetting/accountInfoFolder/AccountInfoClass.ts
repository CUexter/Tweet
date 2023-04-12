class AccountInfo {
  id: string;
  name: string;
  tagName: string;
  password: string;
  email: string;
  visible: boolean;

  constructor(
    id: string,
    name: string,
    tagName: string,
    password: string,
    email: string,
    visible: boolean
  ) {
    this.id = id;
    this.name = name;
    this.tagName = tagName;
    this.password = password;
    this.email = email;
    this.visible = visible;
  }
}
export { AccountInfo };
