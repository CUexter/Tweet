import { api } from "@/utils/api";
import { Avatar, BackgroundImage, createStyles } from "@mantine/core";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { ProfileInfo } from "./ProfileInfoClass";
export default (input: { userID: string }) => {
    const emptyInfo=new ProfileInfo("","","","","",0,0,0);
    const getProfile = api.profile.getProfile.useMutation();
    const [modify,setModify]=useState(false);
    const [profile, setProfile] = useState(emptyInfo);
    const session=useSession();
    const useStyles = createStyles((theme) => ({
        mainBlock: { width: "35%", backgroundColor: theme.colors.blue[0] },
      }));
    const { classes } = useStyles();
    async function fetchProfile() {
        const temp = await getProfile.mutateAsync({ id: input.userID });
        console.log(temp);
        if (temp != null) setProfile(temp);
        else setProfile(emptyInfo);
    }
    function edit(){
        console.log("editing");
    }
    useEffect(() => {
        fetchProfile().catch(Error);
    }, []);

    

    //{session.data?.user.id==input.userID? <div onClick={edit}>EDIT</div>:<></>}
    var content=(<div className={classes.mainBlock+" c"}>
    <div className="pic">
        <BackgroundImage src={profile.profilePicture}>
        <Avatar src={profile.image} alt={profile.displayName} radius="xl"/>
        </BackgroundImage>
    </div>
    <div>
        <span>{profile.displayName}</span>
        <span onClick={edit} className="edit">EDIT</span>
    </div>
    <div>@{profile.tagName}</div>
    <div>{profile.profileDesc}</div>
    <div>Tweeted {profile.tweetCount.toString()} tweets</div>
    <div>
        <span className="follow">Following {profile.beingFollowCount.toString()}</span>
        <span className="follow">Followers {profile.followCount.toString()}</span>
        <></>
    </div>
    </div>);

function fullHeight() {
    return (
      <style global jsx>{`
        html,
        body,
        body > div:first-child,
        div#__next {
          height: 100%;
        }
      `}</style>
    );
  }
    return (<>
     {fullHeight()}
    {content}   
    <style jsx>{`
        :global(.c) {
            position: absolute;
            top: 15%;
            left: 10%;
            width:80%;
        }
        :global(.edit){
            left:90%;
            position:relative;
            width:10%;
        }
        :global(.pic){
            height:30%;
        }
        :global(.follow) {
            margin-right:50px;
        }
        `}</style>
    </>);
};
