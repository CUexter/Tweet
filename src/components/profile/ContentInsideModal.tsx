import { api } from "@/utils/api";
import { TextInput } from "@mantine/core";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { ProfileInfo } from "./ProfileInfoClass";
export default ()=>{
    const emptyInfo=new ProfileInfo("","","","","",0,0,0);
    const session=useSession();
    const [profile, setProfile] = useState(emptyInfo);
    const [modified,setModified]=useState(false);
    const getProfile = api.profile.getProfile.useMutation();
    const setProfileAPI= api.profile.setProfile.useMutation();
    async function fetchProfile() {
        if (session.data!=undefined){
            const profileFetch = await getProfile.mutateAsync({ id: session.data!.user.id });
            console.log(profileFetch);
            if (profileFetch != null) setProfile(profileFetch);
            else setProfile(emptyInfo);
            }
        else setProfile(emptyInfo);
    }

    //dumb way to handle input
  function inputEdit(e: React.ChangeEvent<HTMLInputElement>, s: string) {
    var temp: ProfileInfo = Object.assign(
      Object.create(Object.getPrototypeOf(profile)),
      profile
    );
    switch (s) {
      case "DisplayName": {
        temp.displayName = e.target.value;
        break;
      }
      case "TagName": {
        temp.tagName = e.target.value;
        break;
      }
      case "ProfileDesc": {
        temp.profileDesc = e.target.value;
        break;
      }
      case "ProfilePicture": {
        temp.profilePicture = e.target.value;
        break;
      }
      case "Image": {
        temp.image = e.target.value;
        break;
      }
    }
    setProfile(emptyInfo);
    setProfile(temp);
    setModified(true);
  }
  function inputDisplayName(e: React.ChangeEvent<HTMLInputElement>) {
    inputEdit(e, "DisplayName");
  }
  function inputTagName(e: React.ChangeEvent<HTMLInputElement>) {
    inputEdit(e, "TagName");
  }
  function inputProfileDesc(e: React.ChangeEvent<HTMLInputElement>) {
    inputEdit(e, "ProfileDesc");
  }
  function inputProfilePicture(e: React.ChangeEvent<HTMLInputElement>) {
    inputEdit(e, "ProfilePicture");
  }
  function inputImage(e: React.ChangeEvent<HTMLInputElement>) {
    inputEdit(e, "Image");
  }

  
  function apply(){
    setProfileAPI.mutateAsync({
    displayName: profile.displayName,
    image: profile.image,
    tagName: profile.tagName,
    profileDesc: profile.profileDesc,
    profilePicture: profile.profilePicture,
    });
    setModified(false);
  }
  function reset(){
    fetchProfile();
  }
    useEffect(() => {
        fetchProfile().catch(Error);
    }, []);

    return (<>
    <TextInput
        onChange={inputDisplayName}
        value={profile.displayName}
    ></TextInput>
    <TextInput
        onChange={inputTagName}
        value={profile.tagName}
    ></TextInput>
    <TextInput
        onChange={inputProfileDesc}
        value={profile.profileDesc}
    ></TextInput>
    <TextInput
        onChange={inputProfilePicture}
        value={profile.profilePicture}
    ></TextInput>
    <TextInput
        onChange={inputImage}
        value={profile.image}
    ></TextInput>     
    <div>{modified?<><span onClick={reset}>RESET</span><span onClick={apply}>APPLY</span></>:<></>}</div>  
    </>
    );
}