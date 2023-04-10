import { api } from "@/utils/api";
//import { Switch } from '@mantine/core';
import { Checkbox, TextInput } from "@mantine/core";
import React, { useEffect, useState } from "react";

import { AccountInfo } from "./accountInfoFolder/AccountInfoClass";

export default function accountInfoFunction() {
  const getAccountInfoAPI = api.userSetting.getAccountInfo.useMutation();
  //  const setAccountInfoAPI=api.userSetting.SetAccountInfo.useMutation();
  const emptyAccount = new AccountInfo("", "", "", "", "", false);
  const [accountInfo, setAccountInfo] = useState(emptyAccount);
  const [modified, setModified] = useState(false);
  async function update() {
    console.log("update");
    var AccountInfoObj = await getAccountInfoAPI.mutateAsync();
    setAccountInfo(AccountInfoObj.accountInfo);
  }
  function updateInput() {
    console.log("update input");
    //setValue
    //     setAccountInfoAPI(accountInfo);
    update();
    setModified(false);
  }
  function modify() {
    if (modified == false) setModified(true);
  }
  //dumb way to handle input
  function inputEdit(e: React.ChangeEvent<HTMLInputElement>, s: string) {
    var temp: AccountInfo = Object.assign(
      Object.create(Object.getPrototypeOf(accountInfo)),
      accountInfo
    );
    switch (s) {
      case "Id": {
        temp.id = e.target.value;
        break;
      }
      case "Name": {
        temp.name = e.target.value;
        break;
      }
      case "TagName": {
        temp.tagName = e.target.value;
        break;
      }
      case "Email": {
        temp.email = e.target.value;
        break;
      }
      case "Password": {
        temp.password = e.target.value;
        break;
      }
    }
    setAccountInfo(emptyAccount);
    setAccountInfo(temp);
  }
  function inputId(e: React.ChangeEvent<HTMLInputElement>) {
    inputEdit(e, "Id");
  }
  function inputName(e: React.ChangeEvent<HTMLInputElement>) {
    inputEdit(e, "Name");
  }
  function inputTagName(e: React.ChangeEvent<HTMLInputElement>) {
    inputEdit(e, "TagName");
  }
  function inputEmail(e: React.ChangeEvent<HTMLInputElement>) {
    inputEdit(e, "Email");
  }
  function inputPassword(e: React.ChangeEvent<HTMLInputElement>) {
    inputEdit(e, "Password");
  }
  useEffect(() => {
    update().catch(Error);
  }, []);
  return (
    <>
      <TextInput
        onChange={inputId}
        value={accountInfo.id}
        readOnly={true}
      ></TextInput>
      <TextInput
        onChange={inputName}
        value={accountInfo.name}
        readOnly={!modified}
      ></TextInput>
      <TextInput
        onChange={inputTagName}
        value={accountInfo.tagName}
        readOnly={!modified}
      ></TextInput>
      <TextInput
        onChange={inputEmail}
        value={accountInfo.email}
        readOnly={!modified}
      ></TextInput>
      <TextInput
        onChange={inputPassword}
        value={accountInfo.password}
        readOnly={!modified}
      ></TextInput>
      <Checkbox checked={accountInfo.verified} readOnly={true}></Checkbox>
      {modified ? (
        <div onClick={update}>RESET</div>
      ) : (
        <div onClick={modify}>MODIFY</div>
      )}
      <div onClick={updateInput}>UPDATE</div>
    </>
  );
}
