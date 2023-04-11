import { api } from "@/utils/api";
import { signOut } from "next-auth/react";
export default function a() {
  const deleteAcAPI = api.userSetting.deleteAc.useMutation();
  function deleteAc(){
    signOut();
    deleteAcAPI.mutateAsync();
  }
  return <div onClick={deleteAc}>CONFIRMATION</div>;
}
