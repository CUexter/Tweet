import { api } from "@/utils/api";
import { Switch } from "@mantine/core";
import { useEffect, useState } from "react";

export default function emailVisibilityFunction() {
  const getVisibleAPI = api.userSetting.getVisible.useMutation();
  const setVisibleAPI = api.userSetting.setVisible.useMutation();
  const createAcAPI = api.userSetting.createAc.useMutation();

  const [visibleState, setVisibleState] = useState(false);

  async function updateVisibleLocal() {
    const newVisibility = await getVisibleAPI.mutateAsync();
    console.log("yo " + newVisibility);
    if (newVisibility != undefined) setVisibleState(newVisibility);
  }

  async function setVisible() {
    console.log("set visible request in client, input: " + !visibleState);
    await setVisibleAPI.mutateAsync({ visible: !visibleState });
    //can not use if (await setVisibleAPI.isSuccess){, must fail on first time
    await updateVisibleLocal();
  }

  async function createAc() {
    await createAcAPI.mutate();
    if (createAcAPI.isSuccess) console.log("createAc success");
    else console.log("fail" + createAcAPI.error);
  }

  function Loading() {
    return <p>Loading</p>;
  }

  //occur once
  useEffect(() => {
    updateVisibleLocal().catch(Error);
  }, []);

  return (
    <div>
      <Switch checked={visibleState} readOnly onClick={setVisible} />
      <div onClick={createAc}>CreateAC</div>
    </div>
  );
}
