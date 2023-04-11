import AccountInfo from "@/components/userSetting/accountInfo";
import DeleteAccount from "@/components/userSetting/deleteAccount";
import PrivacySetting from "@/components/userSetting/privacySetting";
import { createStyles } from "@mantine/core";
import { useSession } from "next-auth/react";
import { useState } from "react";

const useStyles = createStyles((theme) => ({
  a: { width: "100%", height: 15, borderBottomWidth: 3, borderTopWidth: 3 },
}));

export default function a() {
  const [renderContent, setRenderContent] = useState("Setting");
  const [session,setSession]=useState(useSession());
  console.log(session);
  
  const { classes } = useStyles();
  var content = (
    <>
      <tr>
        <td
          className={classes.a}
          onClick={() => setRenderContent("AccountInfo")}
        >
          Account Information
        </td>
      </tr>
      <tr>
        <td
          className={classes.a}
          onClick={() => setRenderContent("PrivacySetting")}
        >
          Privacy Settings
        </td>
      </tr>
      <tr>
        <td
          className={classes.a}
          onClick={() => setRenderContent("DeleteAccount")}
        >
          Delete Account
        </td>
      </tr>
    </>
  );

  switch (renderContent) {
    case "AccountInfo": {
      content = <AccountInfo />;
      break;
    }
    case "DeleteAccount": {
      content = <DeleteAccount />;
      break;
    }
    case "PrivacySetting": {
      content = <PrivacySetting />;
      break;
    }
  }
  //if (session.data!=null)
  return (
    <main>
    HI
  </main>)
 // else return <div>INVALID SESSION</div>
}
